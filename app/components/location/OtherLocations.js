import React from "react";
import Link from "next/link";

export default function OtherLocations() {
  return (
    <section className=" pt60">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span">Other locations</span>
          </div>
        </div>
        <div className="row pt30">
          <div className="col-md-6 col-6">
            <div className="box-loc mb-lg-0 mb-md-0 mb-3">
              <Link href="/noida-coworking-space">Noida</Link>
            </div>
          </div>
          <div className="col-md-6 col-6">
            <div className="box-loc mb-lg-0 mb-md-0 mb-3">
              <Link href="/delhi-coworking-space">Delhi</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
