import classes from '../../../public/assets/css/career.module.css';

const Category = function ({
  header, innerText, src, redirectTo, data, setClickRegister,
}) {
  return (
    <div className={classes.category}>
      <div className={classes.imageSection}>
        <img src={src} alt="categoryImage" />
      </div>
      <div className={classes.gradientBkg}>
        <div>
          <h1>{header}</h1>
          <p>{innerText}</p>
        </div>
      </div>
      <a href={redirectTo}>
        <div className={classes.arrow}>
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </div>
      </a>

    </div>
  );
};
export default Category;
