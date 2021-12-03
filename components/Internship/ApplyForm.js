import React from 'react'

const ApplyForm = () => {
    return (
        <div className="container">
            <h1 className="mt-3 mb-3 h3 text-primary text-center">Apply to this position.</h1>
            <form>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">First name</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="First name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Last name</label>
                        <input type="email" class="form-control" id="inputPassword4" placeholder="Last name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Position</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Position" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div class="form-group">
                    <label for="inputAddress2">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" placeholder="City"/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control">
                            <option selected>Choose...</option>
                            <option>Washington</option>
                        </select>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip"  placeholder="Zip"/>
                    </div>
                </div>
                <div className="form-group">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label class="form-check-label" for="inlineRadio1">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">Female</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                        <label class="form-check-label" for="inlineRadio3">Other</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Resume</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                </div>
                <button type="submit" class="btn btn-primary">Apply</button>
            </form>
        </div>
    )
}

export default ApplyForm
