import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/auth';
import Header from './Header';
import Footer from './Footer';
import ProductCreateForm from './ProductCreateForm';
import NotFoundPage from './NotFoundPage';

class CreateProduct extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUser());
  }
  render() {
    const { level } = this.props.auth.userDetails;
    if (level === 1) {
      return (
        <NotFoundPage />
      )
    }
    return level === 2 ? (
      <div id="cover">
        <Header />
        <ProductCreateForm />
        <Footer />
      </div>
    ) : <div></div>
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CreateProduct);

