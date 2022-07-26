import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import HomeSlider from './components/HomeSlider';
import ProductSliderHome from './components/ProductSliderHome';

Home.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    margin: '40px 40px 40px',
  },
  title: {
    fontFamily: '"AdihausDIN-CnBoldItalic","AdihausDIN Cn"',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '40px 0px',
    fontStyle: 'italic',
    textAlign: 'center',
    textDecoration: 'underline',
    textTransform: 'uppercase',
    lineHeight: '20px',
  },
}));
function Home(props) {
  const classes = useStyle();
  return (
    <Box>
      <HomeSlider />
      <Container maxWidth="lg">
        <Typography className={classes.title}>Products Popular</Typography>
        <ProductSliderHome categoryId={1}></ProductSliderHome>
        <ProductSliderHome categoryId={2}></ProductSliderHome>
        <ProductSliderHome categoryId={3}></ProductSliderHome>
      </Container>
    </Box>
  );
}

export default Home;
