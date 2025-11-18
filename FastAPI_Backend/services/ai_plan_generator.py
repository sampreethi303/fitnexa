from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")

langchain_llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", api_key=google_api_key)

# ----- Diet Plan -----
diet_prompt_template = """
You are a professional nutritionist. Create a detailed **Diet Plan** in Markdown table format
for a person based on these details:

Name: {name}
Gender: {gender}
Age: {age}
Height: {height} cm
Weight: {weight} kg
Goal: {goal}
Food Preference: {food_preference}

Return a structured **Markdown table** for 7 days with meals (Breakfast, Lunch, Dinner, Snacks).
"""

diet_prompt = PromptTemplate(
    input_variables=["name", "gender", "age", "height", "weight", "goal", "food_preference"],
    template=diet_prompt_template,
)
diet_chain = LLMChain(llm=langchain_llm, prompt=diet_prompt)

def generate_diet_plan(inputs: dict) -> str:
    return diet_chain.run(inputs)


# ----- Workout Plan -----

# --- Updated Prompt Template ---
workout_prompt_template = """
You are a certified fitness trainer. Create a personalized **Workout Plan** in Markdown table format
based on the following details:

Workout Type: {workout_type}
Diet Type: {diet_type}
Gender: {gender}
Age: {age}
Current Weight: {current_weight} kg
Target Weight: {target_weight} kg
Number of Weeks: {number_of_weeks}
Dietary Restrictions: {dietary_restrictions}
Health Conditions: {health_conditions}
Comments: {comments}

Return a **weekly workout plan** divided by days (Monday to Sunday),
with columns for Exercise Name, Sets, Reps, and Duration.
Also include a short motivational summary at the end.
"""

# --- Define Prompt and Chain ---
workout_prompt = PromptTemplate(
    input_variables=[
        "workout_type",
        "diet_type",
        "gender",
        "age",
        "current_weight",
        "target_weight",
        "number_of_weeks",
        "dietary_restrictions",
        "health_conditions",
        "comments"
    ],
    template=workout_prompt_template,
)

workout_chain = LLMChain(llm=langchain_llm, prompt=workout_prompt)

# --- Main Function ---
def generate_workout_plan(inputs: dict) -> str:
    return workout_chain.run(inputs)

# ----- Chat Functionality -----
async def get_ai_response(question: str) -> str:
    """Answer chat queries."""
    chat_prompt_template = """
    You are a fitness and diet expert. Answer the user's question clearly and professionally.

    Question: {question}

    Provide a clear, breif , and concise response.
    """

    chat_prompt = PromptTemplate(
        input_variables=["question"],
        template=chat_prompt_template,
    )

    chat_chain = LLMChain(llm=langchain_llm, prompt=chat_prompt)
    return chat_chain.run({"question": question})   
