import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={style.header}>
      <div className={style.headerContent}>
        <h1 className={style.head}>Store Name</h1>
        <p className={style.para}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
          suscipit illum quaerat culpa maiores fugiat repellat, saepe commodi
        </p>
        <button onClick={() => navigate("/products")}> let&#39; s buy</button>
      </div>
    </header>
  );
}
