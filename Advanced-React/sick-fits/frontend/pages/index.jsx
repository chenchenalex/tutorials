import Items from "./items";

function Home(props) {
  return (
    <div>
      <Items query={parseFloat(props.query.page) || 1} />
    </div>
  );
}

export default Home;
