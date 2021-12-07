import React from 'react';

const ApplyForm = function () {
  return (
    <div className="container">
      <h1 className="mt-3 mb-3 h3 text-primary text-center">Apply to this position.</h1>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">First name</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="First name" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Last name</label>
            <input type="email" className="form-control" id="inputPassword4" placeholder="Last name" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Position</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Position" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" placeholder="City" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>Washington</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" placeholder="Zip" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
            <label className="form-check-label" htmlFor="inlineRadio3">Other</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Resume</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1" />
        </div>
        <button type="submit" className="btn btn-primary">Apply</button>
      </form>
    </div>
  );
};

export default ApplyForm;
