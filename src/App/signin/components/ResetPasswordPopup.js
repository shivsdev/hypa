import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { apiUrl } from "../../calls/apis";

export default function ViewProfile({
  email,
  isPopupVisible,
  togglePopup,
  resetPassword,
  styles,
}) {
  const [isSent, setisSent] = useState(false);
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let Data = {
      email: emailRef.current.value,
    };
    apiUrl
      .post("/auth/forgotpassword", Data)
      .then(({ data, status }) => {
        resetPassword(emailRef.current.value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    togglePopup();
  };
  const popup_header_bg_colour = "#4395a6";
  const popup_border_colour = "#4395a6";
  const poup_body_bg_colour = "#FFFFFF";
  const header_colour = "green";
  const input_group_colour = "#4395a6";
  const input_colour = "#000";
  const reset_text_colour = "#999";
  const reset_button_colour = "#4395a6";
  const reset_button_text_colour = "#ffffff";
  const Popup = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .popup {
      max-width: 350px;
      width: 90%;
      .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${(props) =>
          props.theme.popup.active_in_focus_banner_background_colour};
        color: white;
        padding: 5px 10px;
        border-radius: 5px 5px 0 0;
        border: 1px solid
          ${(props) => props.theme.popup.active_in_focus_border_colour};
        h3 {
          margin: 0;
          font-weight: 500;
          padding: 0;
          font-size: 100%;
          color: ${(props) =>
            props.theme.popup.active_in_focus_banner_text_colour};
        }
        .close {
          font-weight: bold;
          cursor: pointer;
        }
      }
      .popup-body {
        position: relative;
        border: 1.5px solid
          ${(props) => props.theme.popup.active_in_focus_border_colour};
        border-radius: 0 0 5px 5px;
        padding: 30px 15px;
        background: ${poup_body_bg_colour};
        .email-sent {
          display: flex;
          align-items: center;
          div {
            width: 50%;
            h4 {
              color: ${header_colour};
              font-weight: normal;
            }
          }
          img {
            width: 100%;
          }
        }
        .input-group {
          display: flex;
          flex-direction: column;
          color: ${input_group_colour};
          input {
            height: 38px;
            font-size: 90%;
            color: ${input_colour};
          }
        }
        .reset-text {
          font-size: 80%;
          color: ${(props) => props.theme.main_body_text.font_colour};
          font-style: italic;
        }
        .reset-button-holder {
          text-align: right;
          button {
            border-radius: 5px;
            background-color: ${reset_button_colour};
            color: ${reset_button_text_colour};
            font-size: 90%;
            text-transform: uppercase;
            font-weight: 500;
            cursor: pointer;
            outline: 0;
            padding: 8px 20px;
          }
        }
      }
    }
  `;

  return (
    <Popup theme={styles}>
      <div className="popup">
        <div className="popup-header">
          <h3>Reset Password</h3>
          <span className="close" onClick={closePopup}>
            X
          </span>
        </div>
        <div className="popup-body">
          {isSent ? (
            <div className="email-sent">
              <div>
                <img
                  src="https://media1.tenor.com/images/ee20ed5947b057df7ac026d2c3c8589c/tenor.gif"
                  alt="sent email"
                />
              </div>
              <div>
                <h4>Sent Successfully!</h4>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                {/* <label>Email</label> */}
                <input
                  type="email"
                  defaultValue={email ? email : ""}
                  placeholder="Enter your email"
                  ref={emailRef}
                  name="reset-password"
                />
              </div>
              <p className="reset-text">
                Check your inbox for reset password link, expires in a hour.
              </p>
              <div className="reset-button-holder">
                <button>RESET</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Popup>
  );
}
