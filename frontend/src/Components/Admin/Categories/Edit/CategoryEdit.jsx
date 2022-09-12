import React from "react";
import { useState } from "react";
import style from "./Category.module.css";
import { useParams, useNavigate } from "react-router-dom";
import * as ReactRedux from "react-redux";

function CategoryEdit() {
  // const dispatch = ReactRedux.useDispatch();
  // const { id } = useParams();
  const navigate = useNavigate();

  const { categoryEdit } = ReactRedux.useSelector(
    (state) => state.categoryReducer
  );

  const [input, setInput] = useState({
    name: categoryEdit.name,
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setInput(([e.target.name] = e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //check errors first
    // dispatch();
    alert("El nombre de la categoria se edito correctamente");
    navigate("/admin/categories");
  };
  return (
    <form
      className={style.formPrincipal}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className={style.divSection}>
        <section>
          <label>Nombre</label>
          <input
            name="name"
            value={input.name}
            type="text"
            onChange={(e) => handleInputChange(e)}
          />
          {/* {errors.name && <p className={style.errors}>{errors.name}</p>} */}
        </section>
      </div>
      <button type="submit">Editar</button>
    </form>
  );
}

export default CategoryEdit;