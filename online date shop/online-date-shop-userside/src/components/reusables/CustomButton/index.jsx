import { Button } from 'antd';
import PropTypes from 'prop-types';
import './styles.css';

const CustomButton = ({ onClick, text }) => {
  return (
    <Button size="large" type="primary" block onClick={onClick} className="custom-button uppercase font-bold">
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomButton;
