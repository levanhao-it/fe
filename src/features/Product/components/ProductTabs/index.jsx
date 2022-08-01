import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProductReviewList from '../ProductReviewList';
import './styles.scss';
import DOMPurify from 'dompurify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '60px',
  },
  tabTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#626262',
  },
  tabList: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
  },
  titleRating: {
    fontSize: '14px',
    marginLeft: '10px',
  },
  commentLink: {
    fontSize: '14px',
    textDecoration: 'underline',
    color: '#000',
    marginTop: '6px',
    cursor: 'pointer',
    display: 'inline-block',
  },
}));

ProductTabs.propTypes = {
  product: PropTypes.object.isRequired,
};

export default function ProductTabs({ product = {} }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const clearDescription = DOMPurify.sanitize(product.description);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.tabList}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.tabs}
        >
          <Tab label="Overview" {...a11yProps(0)} className={classes.tabTitle} />
          <Tab label="Review" {...a11yProps(1)} className={classes.tabTitle} />
          <Tab label="Product tag" {...a11yProps(2)} className={classes.tabTitle} />
          <Tab label="Additional" {...a11yProps(3)} className={classes.tabTitle} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <Typography variant="body2">{product.description}</Typography> */}
        <div dangerouslySetInnerHTML={{ __html: clearDescription }} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductReviewList product={product} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="body2">#{product.categoryName}</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="body2">#{product.categoryName}</Typography>
      </TabPanel>
    </div>
  );
}
