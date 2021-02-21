export default ({ open, setOpen }) => {
  return (
    <button className={`Burger ${open ? "open" : ""}`} open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
    </button>
  );
};
