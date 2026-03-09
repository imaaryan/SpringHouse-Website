export default function PropertyAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="specfic-prop amenities pt-5">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-lg-6 col-12">
            <span className="section-title-span">amenities</span>
          </div>
        </div>
        <div className="row line pe-3 ps-lg-3 ps-md-3 ps-0">
          {amenities.map((amenity) => (
            <div
              key={amenity._id}
              className="col-md-3 col-6 mb-5 property-amenities"
            >
              <div className="icon-amen text-center">
                <img
                  src={amenity.featuredIcon}
                  alt={amenity.name}
                  width={50}
                  height={50}
                />
                <a href="#">{amenity.name}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
