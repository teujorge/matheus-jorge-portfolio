import Image from "next/image";
import ProfileImg from "../public/images/profile.jpg";
import { css, keyframes } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const About = () => {
  const blobAnimation = keyframes`
  0% {
    border-radius: 50% 60% 90% 40%/80% 40% 90% 70%;
  }
  50% {
    border-radius: 70% 50% 30% 70%/30% 90% 50% 60%;
  }
  100% {
    border-radius: 50% 60% 90% 40%/80% 40% 90% 70%;
  }
`;

  return (
    <div className="section">
      <h2>about me</h2>
      <div
        className="reveal"
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          @media (max-width: 1000px) {
            flex-direction: column;
          }

          @media (max-width: 800px) {
            margin: 0px !important;
          }
        `}
      >
        <Image
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px !important;
            margin-inline: auto !important;
            padding: 3px;
            border-radius: 50%;
            background-color: black;
            filter: grayscale(1);
            transition: border-radius 0.2s ease, filter 0.5s ease;
            animation: ${blobAnimation} 10s ease-in-out infinite;

            :hover {
              border-radius: 10px;
              filter: grayscale(0);
            }

            @media (prefers-color-scheme: dark) {
              background-color: white;
            }
          `}
          src={ProfileImg}
          alt={"profile-image"}
          width={200}
          height={200}
          priority
        />

        <div
          css={css`
            margin: 30px;

            p {
              margin-top: 20px;
            }

            @media (max-width: 800px) {
              margin: 10px;
            }
          `}
        >
          <p className="reveal">
            I am an innovative Software Engineer with a proven track record of
            identifying issues and achieving solutions to satisfy project
            requirements. Committed to working as a collaborative and positive
            team member, striving to utilize my knowledge and expertise for
            optimal engineering results.
          </p>

          <p className="reveal">
            Here are a few technologies I have enjoyed working with:
          </p>

          <div
            className="reveal"
            css={css`
              display: flex;
              margin: 12px !important;

              & ul {
                margin-left: 16px;
                margin-right: 16px;
              }
            `}
          >
            <ul>
              <li>Python</li>
              <li>Arduino</li>
              <li>Flutter</li>
            </ul>
            <ul>
              <li>React</li>
              <li>NextJS</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
