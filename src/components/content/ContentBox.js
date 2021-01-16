import { Spinner, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./contentbox.scss";

export const ContentBox = ({ content, country }) => {

  return (
    <>
      {content.ip && (
        <div className="content-wrapper">
          <MapContainer center={[content.latitude, content.longitude]} zoom={3} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[content.latitude, content.longitude]}></Marker>
            <div className="content-flag">
              <img
                className="flag-img"
                width="50px"
                height="50px"
                src={country.flag}
                alt="country-flag"
              />
              <a
                className="street-link"
                target="_blank"
                rel="noreferrer"
                href={`http://maps.google.com/maps?q=&layer=c&cbll=${content.latitude},${content.longitude}`}
              >
                <i className={"eva eva-map-outline"}></i>
                Street View
              </a>
            </div>
          </MapContainer>
          {console.log(country)}
          <div className="content-section-title">
            <h2 className="section-title">General</h2>
          </div>
          <div className="general-content">
            <Stat>
              <StatLabel>Continent</StatLabel>
              <StatNumber>{`${country.region} (${content.continent_code})`}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Country</StatLabel>
              <StatNumber>{`${content.country_name} (${content.country_code})`}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Region</StatLabel>
              <StatNumber>{`${content.region} (${content.region_code})`}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>City</StatLabel>
              <StatNumber>{`${content.city}`}</StatNumber>
            </Stat>
          </div>

          <div className="content-section-title">
            <h2 className="section-title">Details</h2>
          </div>

          <div className="general-content">
            <div className="details-list">
            <div className="details-list-item">
                <h3 className="list-item-title">EU Member</h3>
                <p className="list-item-descrip">{content.in_eu ? 'Yes' : 'No'}</p>
              </div>
            <div className="details-list-item">
                <h3 className="list-item-title">Population</h3>
                <p className="list-item-descrip">{country.population}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Subregion</h3>
                <p className="list-item-descrip">{country.subregion}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Currency</h3>
                <p className="list-item-descrip">{`${content.currency_name} (${content.currency})`}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Zip Code</h3>
                <p className="list-item-descrip">{content.postal}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Capital</h3>
                <p className="list-item-descrip">{content.country_capital}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Timezone</h3>
                <p className="list-item-descrip">{country.timezones}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Coordinates</h3>
                <p className="list-item-descrip">{`${content.latitude.toFixed(
                  2
                )}, ${content.longitude.toFixed(2)}`}</p>
              </div>
              <div className="details-list-item">
                <h3 className="list-item-title">Code</h3>
                <p className="list-item-descrip">{country.numericCode}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!content.ip && (
        <div className="loader">
            <Spinner size="xl" color={'#fff'}/>
        </div>
      )}
    </>
  );
};
