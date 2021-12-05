import { useState } from "react";
import HomepageNav from "../../components/homepage/HomepageNav";
import links from "../../contexts/utils/links";
import Layout from "../../components/Layout";
import SidebarTwo from "../../components/SidebarTwo";
import ImgUploadIconSvg from "../../components/career-components/svgs/ImgUploadIconSvg";
import Footer from "../../components/Footer";

const CreateNewCompany = function () {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <HomepageNav open={open} setOpen={setOpen} page="Company" />
      <SidebarTwo open={open} setOpen={setOpen} links={links} active="Home" />
      <div className="create-new-company-page tw-pb-20 tw-pt-24 tw-mt-20">
        <div className="tw-container tw-mx-auto px-4">
          <div className="tw-relative">
            <div className="tw-mb-1 tw-h-2 tw-bg-yellow-500 tw-w-3/5 sm:tw-w-1/2 md:tw-w-2/5 lg:tw-w-1/3 xl:tw-w-3/8 tw-mx-auto tw-rounded-md" />
            <form className="tw-w-full md:tw-w-10/12 tw-mx-auto tw-bg-black tw-bg-white tw-bg-opacity-25 tw-p-4 sm:tw-p-10 tw-rounded-3xl tw-relative tw-z-10">
              <header className="tw-text-white tw-text-center tw-text-2xl tw-font-bold tw-mb-8">
                Create a Company
              </header>
              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-16">
                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                  <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                    Company Name
                    <span className="tw-text-xl tw-text-yellow-200">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                    type="text"
                    placeholder="Name of Your Company"
                  />
                </div>
                <div className="tw-mb-3">
                  <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                    Company Type
                    <span className="tw-text-xl tw-text-yellow-200">*</span>
                  </label>
                  <div>
                    <select
                      name="type_company"
                      required
                      className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
                    >
                      <option
                        value="nonprofit"
                        style={{ background: "#151371" }}
                      >
                        Non-Profit
                      </option>
                      <option value="llc" style={{ background: "#151371" }}>
                        LLC
                      </option>
                      <option value="club" style={{ background: "#151371" }}>
                        Club
                      </option>
                      <option value="c_corp" style={{ background: "#151371" }}>
                        C-Corp
                      </option>
                      <option value="s_corp" style={{ background: "#151371" }}>
                        S-Corp
                      </option>
                      <option value="lp" style={{ background: "#151371" }}>
                        LP
                      </option>
                      <option
                        value="educational"
                        style={{ background: "#151371" }}
                      >
                        Educational
                      </option>
                      <option value="dao" style={{ background: "#151371" }}>
                        DAO
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                  Headquarters Location
                  <span className="tw-text-xl tw-text-yellow-200">*</span>
                </label>
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-16">
                  <div className="form-input-group tw-flex tw-w-full tw-mb-3">
                    <span className="tw-text-white tw-mr-2 tw-pt-1">City</span>
                    <input
                      name="headquarters_city"
                      required
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="City of Headquarters"
                    />
                  </div>

                  <div className="form-input-group tw-flex tw-w-full tw-mb-3">
                    <span className="tw-text-white tw-mr-2 tw-pt-1">State</span>
                    <input
                      name="headquarters_state"
                      required
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="State of Headquarters"
                    />
                  </div>

                  <div className="form-input-group tw-flex tw-w-full tw-mb-3">
                    <span className="tw-text-white tw-mr-2 tw-pt-1">
                      Country
                    </span>
                    <input
                      name="headquarters_country"
                      required
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="Country of Headquarters"
                    />
                  </div>
                </div>
              </div>

              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-16">
                <div className="form-input-group tw-flex tw-flex-col tw-mb-3">
                  <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                    Date Founded
                    <span className="tw-text-xl tw-text-yellow-200">*</span>
                  </label>
                  <input
                    name="started_at"
                    type="date"
                    className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent"
                  />
                </div>
                <div className="tw-mb-3">
                  <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                    Company Size
                    <span className="tw-text-xl tw-text-yellow-200">*</span>
                  </label>
                  <div>
                    <select
                      name="size_company"
                      required
                      className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
                    >
                      <option name="1" style={{ background: "#151371" }}>
                        1
                      </option>
                      <option name="2" style={{ background: "#151371" }}>
                        2-10
                      </option>
                      <option name="11" style={{ background: "#151371" }}>
                        11-50
                      </option>
                      <option name="501" style={{ background: "#151371" }}>
                        501-1000
                      </option>
                      <option name="1001" style={{ background: "#151371" }}>
                        1001-5000
                      </option>
                      <option name="5001" style={{ background: "#151371" }}>
                        5001-10,000
                      </option>
                      <option name="10000" style={{ background: "#151371" }}>
                        10,000+
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="tw-flex tw-flex-col sm:tw-flex-row">
                <div className="tw-w-full sm:tw-mr-12">
                  <div className="tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                      Industry
                      <span className="tw-text-xl tw-text-yellow-200">*</span>
                    </label>
                    <div>
                      <select
                        name="industry"
                        required
                        className="tw-w-full tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80 tw-text-white"
                      >
                        <option style={{ background: "#151371" }}>Art</option>
                        <option style={{ background: "#151371" }}>
                          Automotive
                        </option>
                        <option style={{ background: "#151371" }}>
                          Medical
                        </option>
                        <option style={{ background: "#151371" }}>
                          Science
                        </option>
                        <option style={{ background: "#151371" }}>
                          Technology
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-input-group tw-flex tw-flex-col tw-w-full tw-mb-3">
                    <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                      Company Specialties
                      <span className="tw-text-xl tw-text-yellow-200">*</span>
                    </label>
                    <input
                      name="specialties"
                      required
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="Add specialties, separated by commas"
                    />
                  </div>
                </div>

                <div className="tw-w-full sm:tw-w-1/3 tw-flex tw-flex-col tw-items-center tw-justify-between">
                  <label
                    className="tw-w-44 tw-h-44 tw-border tw-border-1 tw-text-4xl tw-text-white tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center"
                    for="company-logo"
                  >
                    <ImgUploadIconSvg />
                  </label>

                  <input
                    type="file"
                    name="logo"
                    className="tw-hidden"
                    id="company-logo"
                  />
                  <div className="tw-text-white">Upload Logo</div>
                </div>
              </div>

              <div className="tw-flex tw-flex-col tw-mb-3">
                <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                  Company Description{" "}
                  <span className="tw-text-xl tw-text-yellow-200">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows="6"
                  className="tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                  placeholder="Describe your company."
                ></textarea>
              </div>

              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-16">
                <div className="form-input-group tw-flex tw-flex-col tw-w-full tw-mb-3">
                  <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                    Website
                    <span className="tw-text-xl tw-text-yellow-200">*</span>
                  </label>
                  <input
                    name="website"
                    required
                    className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                    type="text"
                    placeholder="Company Website"
                  />
                </div>

                <div className="form-input-group tw-flex tw-flex-col tw-w-full tw-mb-3">
                  <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                    E-mail Suffix
                    <span className="tw-text-xl tw-text-yellow-200">*</span>
                  </label>
                  <input
                    name="e-mail_suffix"
                    required
                    className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                    type="text"
                    placeholder="Suffix of Company E-mail"
                  />
                </div>
              </div>

              <div>
                <label className="tw-text-white tw-text-lg tw-mb-1 tw-font-bold">
                  Social Media Links
                </label>
                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-16">
                  <div className="form-input-group tw-flex tw-w-full tw-mb-3">
                    <div>
                      <span className="tw-text-white  tw-pt-1">LinkedIn</span>
                      <span className="tw-text-xl tw-text-yellow-200 tw-mr-2">
                        *
                      </span>
                    </div>
                    <input
                      name="social_media_link_li"
                      required
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="LinkedIn Company Page"
                    />
                  </div>

                  <div className="form-input-group tw-flex tw-w-full tw-mb-3">
                    <span className="tw-text-white tw-mr-2 tw-pt-1">
                      Facebook
                    </span>
                    <input
                      name="social_media_link_fb"
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="Facebook Company Page"
                    />
                  </div>

                  <div className="form-input-group tw-flex tw-w-full tw-mb-3">
                    <span className="tw-text-white tw-mr-2 tw-pt-1">
                      Twitter
                    </span>
                    <input
                      name="social_media_link_tw"
                      className="focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-300 tw-w-full tw-text-white tw-py-1 tw-px-2 tw-border tw-border-white tw-bg-transparent tw-placeholder-white tw-placeholder-opacity-80"
                      type="text"
                      placeholder="Twitter Company Page"
                    />
                  </div>
                </div>
              </div>

              <div className="form-input-group tw-mt-5 tw-mb-3">
                <label className="companyType-label tw-text-blue-800">
                  <input
                    name="authorization"
                    required
                    type="checkbox"
                    className="companyType-checkbox tw-mr-1"
                  />
                  <span className="companyType-custom-checkbox"></span>
                  <span>
                    I am an authorized representative of this
                    company/organization
                  </span>
                </label>
              </div>

              <input
                method="GET"
                action="/"
                className="tw-block tw-mx-auto tw-py-3 tw-px-8 tw-mt-5 tw-text-white tw-font-bold tw-tracking-wide"
                style={{ background: "#151371" }}
                type="submit"
                value="Create Company"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default CreateNewCompany;
