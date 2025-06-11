import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FreelancerGuide = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Education page since freelancer guide is now in the learning center
    navigate("/education", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ghb-light/30 via-white to-ghb-accent/5 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold text-ghb-dark thai-text mb-2">
          กำลังเปลี่ยนเส้นทาง...
        </h1>
        <p className="text-ghb-gray thai-text">
          คู่มือฟรีแลนซ์ได้ย้ายไปยังศูนย์การเรียนรู้แล้ว
        </p>
      </div>
    </div>
  );
};

export default FreelancerGuide;
