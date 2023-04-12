import React from "react";
import { BlogInnerCard } from "../bloginnercard";
import { useNavigate } from "react-router-dom";

const BlogCard = () => {
  const navigate = useNavigate();
  return (
    <div className="blogcard-container">
      <div className="blogcard-container-wrapper">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <BlogInnerCard
            onClick={() => navigate("/article")}
            heading="Slik skriver du CVen: En komplett guide for nybegynnere"
            content="Her går vi gjennom alt man trenger å vite for å skrive CVen"
            date="19. mars 2022"
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
