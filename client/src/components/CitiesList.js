import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCities } from "../store/actions/citiesActions";

class CitiesList extends React.Component {
  //on mount, fetch cities form MongoDB, set redux state, and store here in props
  componentDidMount() {
    this.props.getCities();
  }
  //function that creates styled divs per city
  citiesBody() {
    if (this.props.cities.length > 1) {
      let body = this.props.cities.map(city => {
        return (
          <div key={city._id}>
            <NavLink to={"/itineraries/" + city.name}>
              <h2>{city.name}</h2>
              <img src={city.preview_img} alt="preview card for city" />
            </NavLink>
          </div>
        );
      });
      return body;
    }
  }

  render() {
    return (
      <div>
        <h1>All Cities</h1>
        {this.citiesBody()}
      </div>
    );
  }
}
//grab cities from redux-store-state and save as params here under this.props.city
const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

//store dispatch actions/methods in props here
const mapDispatchToProps = dispatch => {
  return {
    getCities: () => dispatch(getCities())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CitiesList));
