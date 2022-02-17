import React, { Fragment } from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  path: string;
}

export const Footer = ({ path }: FooterProps) => {
  return (
    <footer className="footer">
      {path !== "custom" ? (
        <Fragment>
          <h4 className="footer__text">
            Click
            <Link to="/custom" className="link">
              {" "}
              here{" "}
            </Link>
            to handle your onw task list
          </h4>
        </Fragment>
      ) : (
        <Fragment>
          <h4 className="footer__text">
            Click
            <Link to="/" className="link">
              {" "}
              here{" "}
            </Link>
            to get random tasks
          </h4>
        </Fragment>
      )}
    </footer>
  );
};
