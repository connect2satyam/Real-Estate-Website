import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Property, Section } from "../components";
import {
  ContactAgentContainer, FooterContainer, HeaderContainer, PropertyRelatedContainer
} from "../containers";
import {
  PropertGallery,
  PropertyAddress,
  PropertyAmenities, PropertyDescription, PropertyFeatures
} from "../partials/property_features_partial";
import {
  getFeaturedList, getProperty
} from "../redux/actions/propertiesAction";


const Listing = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const singleProperty = useSelector((state) => state.property);

  const featuredList = useSelector((state) => state.featuredProperty);

  const { featured: featuredProperties } = featuredList;

  const { property } = singleProperty;

  // To display featured properties except one with the id
  const filteredFeatured = featuredProperties.filter(
    (property) => property.id !== +id
  );

  useEffect(() => {
    dispatch(getProperty(id));
    dispatch(getFeaturedList());
  }, [dispatch, id]);

  return (
    <>
      <HeaderContainer bg="false" />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <Property.Header>
            <Property.HeaderLeft>
              <Property.Title>{property.title}</Property.Title>
              <Property.Location>
                <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                <Property.Text>{property.location}</Property.Text>
              </Property.Location>
            </Property.HeaderLeft>
            <Property.HeaderRight>
              <Property.Title>
                Ksh {"   "}
                {property.price}
                <Property.Span>
                  {property.type === "rental" ? "/ Month" : ""}
                </Property.Span>
              </Property.Title>
            </Property.HeaderRight>
          </Property.Header>
          <Property.Content>
            <Property.Left>
              <PropertGallery image={property.images} />
              <PropertyFeatures features={property.features} />
              <PropertyAmenities amenities={property.amenities} />
              <PropertyAddress address={property.address} />
              <PropertyDescription description={property.description} />
            </Property.Left>
            <Property.Right>
              <ContactAgentContainer property={property} />
              <PropertyRelatedContainer
                property={property}
                featured={filteredFeatured}
              />
            </Property.Right>
          </Property.Content>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default Listing;
