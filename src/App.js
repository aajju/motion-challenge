import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  margin-bottom: 49px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 40px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 25px;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Btn = styled.button``;

// const Box = styled(motion.div)<{ boxbgimage: string }>`
//   height: 200px;
//   width: 100%;
//   min-width: 120px;
//   background-color: white;
//   color: white;
//   background-image: url(${(props) => props.boxbgimage});

// <Box
// layoutId={`${movie.id}_${category}`}
// variants={boxVariants}
// whileHover="hover"
// key={movie.id}
// boxbgimage={makeImagePath(movie.poster_path, "w500")}
// onClick={() => {
//   movie.title !== undefined
//     ? boxClick(movie.id, category)
//     : boxClick(movie.id, category);
// }}
// >

function App() {
  const [rectId, setRectId] = useState(null);
  const [circleId, setCircleId] = useState(true);

  const HandleSwitch = () => {
    setCircleId((prev) => !prev);
  };

  // switch (액션.type) {
  //   case '수량증가' :
  //     return 수량증가된state;
  //   case '수량감소' :
  //     return 수량감소된state;
  //   default :
  //     return state
  // }

  return (
    <Wrapper>
      <AnimatePresence>
        <Grid>
          {["1", "2", "3", "4"].map((n) => (
            <>
              <Box
                whileHover={
                  n === "1"
                    ? { scale: 1.2, transformOrigin: "bottom right" }
                    : n === "2"
                    ? { scale: 1.2, transformOrigin: "bottom left" }
                    : n === "3"
                    ? { scale: 1.2, transformOrigin: "top right" }
                    : { scale: 1.2, transformOrigin: "top left" }
                }
                onClick={() => setRectId(n)}
                key={n}
                layoutId={n}
              >
                {(n === "2") & circleId ? (
                  <Circle key={n} layoutId="circle" />
                ) : (n === "3") & !circleId ? (
                  <Circle key={n} layoutId="circle" />
                ) : null}
              </Box>
            </>
          ))}
        </Grid>
      </AnimatePresence>
      <AnimatePresence>
        {rectId ? (
          <Overlay
            variants={overlay}
            onClick={() => setRectId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={rectId}
              style={{ width: 250, height: 250, backgroundColor: "white" }}
            >
              {((rectId === "2") & circleId) |
              ((rectId === "3") & !circleId) ? (
                <Circle layoutId="circle" />
              ) : null}
            </Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Btn onClick={HandleSwitch}>switch</Btn>
    </Wrapper>
  );
}

export default App;
