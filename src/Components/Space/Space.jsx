import PropTypes from 'prop-types';


const Spacer = ({ width = 0, height = 0, ...props }) => {
    return <div style={{ width, height }} {...props}></div>;
};

Spacer.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Spacer;
