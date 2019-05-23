import React from "react";

const localStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: "1",
    // height: "100px",
    width: "100%"
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "#212121",
    color: "#00fd97",
    cursor: "pointer"
  }
};

const Navbar = ({ children, height, buttons, variant }) => {
  return (
    <div>
      <div style={{ ...localStyles.container, height }}>
        <div style={localStyles.button}>
          {buttons.map((button, index) => (
            <div
              onClick={button.onClick}
              style={
                index !== buttons.length - 1
                  ? {
                      marginRight: 20,
                      opacity: button.id === variant ? 1 : 0.6
                    }
                  : { marginRight: 0, opacity: button.id === variant ? 1 : 0.6 }
              }
              key={index}
            >
              {button.text}
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Navbar;