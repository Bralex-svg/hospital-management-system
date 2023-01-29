// import SignIn from "../public/images/sign.jpg";
import Back from "../public/images/backgroundImg.jpg";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";
export default function Login() {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div className="bg-gradient-to-tr   from-gray-900 to-gray-900 h-[30rem] w-full ">
          <div className="w-[100%] object-cover h-0  mix-blend-overlay">
            <Image
              className="h-[40rem]"
              // width="100%"
              // height="30vh"
              style={{
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              src={Back}
              alt=""
            />
          </div>

          <div>
            {/* <div className=" translate-y-[0%] ">
              <Image width="800" height="1000" src={SignIn} alt="sign" />
            </div> */}

            <Stack
              alignItems="center"
              flex={1}
              justifyContent="center"
              overflow="hidden"
              height="30vh"
            >
              <Typography
                color={(theme) => theme.palette.common.white}
                variant="h2"
                fontWeight="bold"
              >
                PATIENT SIGN IN
              </Typography>
            </Stack>
          </div>
        </div>

        {/* FORM */}
      </div>
    </>
  );
}
