import os
from datetime import datetime, timedelta
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, Field
import motor.motor_asyncio
from passlib.context import CryptContext
import jwt
from dotenv import load_dotenv

# Import planner functions
# Import new AI generators
from services.ai_plan_generator import generate_diet_plan, generate_workout_plan , get_ai_response

# ------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "fitnexa")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretkey")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "200"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
auth_scheme = HTTPBearer()

# ------------------------------------------------------------
# APP SETUP
# ------------------------------------------------------------
app = FastAPI(title="Fitnexa API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# DATABASE SETUP
# ------------------------------------------------------------
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users"]

# ------------------------------------------------------------
# AUTH MODELS
# ------------------------------------------------------------
class RegisterIn(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)
    confirmPassword: Optional[str] = None
    phone: Optional[str] = None
    plan: Optional[str] = None


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    plan: Optional[str] = None
    created_at: datetime

class ChatRequest(BaseModel):
    question: str


# ----- Diet Plan -----
class DietRequest(BaseModel):
    name: str
    gender: str
    age: int
    height: float
    weight: float
    goal: str
    number_of_weeks: int
    food_preference: str


# ----- Workout Plan -----
class WorkoutRequest(BaseModel):
    workout_type: str
    diet_type: str
    current_weight: float
    target_weight: float
    dietary_restrictions: str = ""
    health_conditions: str = ""
    age: int
    gender: str
    number_of_weeks: int
    comments: str = ""


# ------------------------------------------------------------
# AUTH UTILITIES
# ------------------------------------------------------------
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email.lower()})


# ------------------------------------------------------------
# DEPENDENCY: CURRENT USER
# ------------------------------------------------------------
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user.get("phone"),
        "plan": user.get("plan"),
        "created_at": user["created_at"],
    }


# ------------------------------------------------------------
# AUTH ROUTES
# ------------------------------------------------------------
@app.post("/api/register")
async def register_user(data: RegisterIn):
    if data.confirmPassword and data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    existing = await get_user_by_email(data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(data.password)
    user_doc = {
        "name": data.name,
        "email": data.email.lower(),
        "hashed_password": hashed,
        "phone": data.phone,
        "plan": data.plan,
        "created_at": datetime.utcnow(),
    }

    await users_collection.insert_one(user_doc)
    return {"message": "Registration successful. Please log in."}


@app.post("/api/login")
async def login_user(data: LoginIn):
    user = await get_user_by_email(data.email)
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user["email"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "phone": user.get("phone"),
            "plan": user.get("plan"),
        },
    }

@app.get("/verify-token")
async def verify_token(current_user=Depends(get_current_user)):
    return {"status": "valid", "user": current_user}

@app.get("/api/me", response_model=UserOut)
async def get_profile(current_user=Depends(get_current_user)):
    return current_user



@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest, user=Depends(get_current_user)):
    try:
        question = request.question
        response_text = await get_ai_response(question)  # ✅ safe name + no async confusion
        return JSONResponse(content={"response": response_text})
    except Exception as e:
        print("Error in /api/chat:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})

# ------------------------------------------------------------
# NEW ROUTES: Diet & Workout
# ------------------------------------------------------------
@app.post("/api/dietplan")
async def get_diet_plan(request: DietRequest, current_user=Depends(get_current_user)):
    try:
        plan = generate_diet_plan(request.dict())
        return {"user": current_user["name"], "diet_plan": plan}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/workoutplan")
async def get_workout_plan(request: WorkoutRequest, current_user=Depends(get_current_user)):
    try:
        plan = generate_workout_plan(request.dict())
        return {"user": current_user["name"], "workout_plan": plan}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# ------------------------------------------------------------
# ROOT & HEALTH
# ------------------------------------------------------------
@app.get("/")
def home():
    return {"message": "Welcome to Fitnexa — Fitness & Diet Planner API! 🚀"}


@app.get("/api/health")
async def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}


# ------------------------------------------------------------
# GLOBAL ERROR HANDLER
# ------------------------------------------------------------
@app.exception_handler(Exception)
async def handle_exceptions(request: Request, exc: Exception):
    text = str(exc)
    if "E11000" in text or "duplicate key" in text.lower():
        return JSONResponse(status_code=400, content={"detail": "Email already registered"})
    return JSONResponse(status_code=500, content={"detail": str(exc)})
