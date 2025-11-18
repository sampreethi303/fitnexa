// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Navbar";
// import Home from "./Home";
// import Dietplan from "./DietPlan";
// import Consultant from "./Consultant";
// import Whychooseus from "./WhyChooseUs";
// import JoinNow from "./JoinNow";   // ✅ Import
// import Workout from "./Workout";
// import Progress from "./Progress";

// function App() {
//   return (
//     <Router>
//       {/* Navbar always visible */}
//       <Navbar />

//       {/* Define routes */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dietplan" element={<Dietplan />} />
//         <Route path="/workout" element={<Workout/>} />
//         <Route path="/consultant" element={<Consultant />} />
//         <Route path="/progress" element={<Progress />} />
//         <Route path="/whychooseus" element={<Whychooseus />} />
//          <Route path="/join" element={<JoinNow />} />   {/* ✅ Join Now page */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import JoinNow from "./JoinNow";
import WhyChooseUs from "./WhyChooseUs";
import DietPlan from "./DietPlan";
import Workout from "./Workout";
import Consultant from "./Consultant";
import Progress from "./Progress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinNow />} />
        <Route path="/whychooseus" element={<WhyChooseUs />} />
        <Route path="/dietplan" element={<DietPlan />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/consultant" element={<Consultant />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;

