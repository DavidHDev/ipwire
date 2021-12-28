/* eslint-disable react/style-prop-object */
import { Spinner, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import pdf, { PDFDocument,PDFText } from 'react-pdfmake';
import "./contentbox.scss";

export const ContentBox = ({ content, country }) => {

  const pdfFile = useMemo((pdfcontent, pdfcountry) => {
    if (content.ip) {
      pdfcontent = content;
      pdfcountry = country;
    }
    return pdf(
      <PDFDocument
        pageSize="A5"
        pageOrientation="portrait"
        pageBreakBefore={(currentNode, followingNodesOnPage) => {
          return (
            currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0
          );
        }}
        styles={{
          header: {
            fontSize: 18,
            margin: [0, 20, 0, 10],
          }
        }}
      >
        <PDFText color="gray" italics style="header">
          {`IP Address: ${pdfcontent?.ip}`}
        </PDFText>
        <PDFText color="gray" italics style="header">
          {`General`}
        </PDFText>
        <PDFText>{`Continent: ${pdfcontent?.region}`}</PDFText>
        <PDFText>{`Country: ${pdfcontent?.country_name} (${content?.country_code})`}</PDFText>
        <PDFText>{`Region: ${pdfcontent?.region} (${content?.region_code})`}</PDFText>
        <PDFText>{`City: ${pdfcontent?.city}`}</PDFText>

        <PDFText color="gray" italics style="header">
          {`Details`}
        </PDFText>
        <PDFText>{`EU Member: ${pdfcontent?.in_eu ? 'Yes' : 'No'}`}</PDFText>
        <PDFText>{`Population: ${pdfcountry?.population}`}</PDFText>
        <PDFText>{`Subregion: ${pdfcountry?.subregion}`}</PDFText>
        <PDFText>{`Currency: ${pdfcontent?.currency_name} (${pdfcontent?.currency})`}</PDFText>
        <PDFText>{`Zip Code: ${pdfcontent?.postal}`}</PDFText>
        <PDFText>{`Capital: ${pdfcontent?.country_capital}`}</PDFText>
        <PDFText>{`Timezone: ${pdfcountry?.timezones}`}</PDFText>
        <PDFText>{`Coordinates: ${content?.latitude}, ${content?.longitude}`}</PDFText>
      </PDFDocument>
    )
  }, [content, country]);

  return (
    <>
      {content.ip && (
        <div className="content-wrapper">
          <MapContainer center={[content.latitude, content.longitude]} zoom={4} scrollWheelZoom={false} dragging={true} touchZoom={true}>
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
                src={country?.flags?.svg}
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
                <p className="list-item-descrip">{`${content.latitude.toFixed(2)}, ${content.longitude.toFixed(2)}`}</p>
              </div>
            </div>
          </div>
          <div className="download-container">
            <button className="download-button" onClick={() => pdfFile.download(`IP Data - ${content?.ip}.pdf`)}>
              Download Info <span>(pdf)</span>
            </button>
            <button className="download-button" onClick={() => pdfFile.print()}>
              Print Info
            </button>
          </div>
        </div>
      )}
      {!content.ip && (
        <div className="loader">
          <Spinner size="xl" color={'#fff'} />
          <p>Please enable trackers in your browser for this application to work.</p>
        </div>
      )}
    </>
  );
};
