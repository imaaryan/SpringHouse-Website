export default function OurCommunity({ data = [] }) {
  const defaultLogos = [
    "/assets/ourcommunity/1748328283_91 Mobiles.png",
    "/assets/ourcommunity/1748328383_Make My Trip.png",
    "/assets/ourcommunity/1748328393_Mini So.png",
    "/assets/ourcommunity/1748328412_Axis Max.png",
    "/assets/ourcommunity/1748328449_Lenskart.png",
    "/assets/ourcommunity/1748328484_Jimmy's Cocktails.png",
    "/assets/ourcommunity/1748328506_Hero.png",
    "/assets/ourcommunity/1748328543_Godrej.png",
    "/assets/ourcommunity/1748328580_Darwin Box.png",
    "/assets/ourcommunity/1748334200_Ad Yogi.png",
    "/assets/ourcommunity/1750225421_Cars24.png",
    "/assets/ourcommunity/1750225503_Your Story (1).png",
  ];

  const displayLogos = data?.length > 0 ? data : defaultLogos;

  return (
    <div className="our-comunity">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <span className="section-title-span" style={{ paddingLeft: 0 }}>
              Our Community
            </span>
          </div>
        </div>
        <div className="client-grid pt30">
          {displayLogos.map((src, index) => (
            <div className="client-grid-item" key={index}>
              <div className="client-logo">
                <img
                  src={src}
                  alt="coworking spaces – SpringHouse coworking office view"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

