import React, { Component } from "react";
import { Box, Button, withStyles } from "@material-ui/core";
import { getBlogsData } from "../services/blogService";
import BlogDetailsComponent from "../Components/BlogDetailsComponent";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";

const useStyles = {
  table: {
    minWidth: 650,
  },
};

class BlogPostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiPageNo: 0,
      blogsData: [],
      blogDetails: {
        open: false,
        data: null,
      },
      page: 0,
      rowsPerPage: 10,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.getBlogData();
    }, 10000);
    this.getBlogData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBlogData = () => {
    getBlogsData(this.state.apiPageNo).then((res) => {
      this.setState({
        blogsData: [...this.state.blogsData, ...res.data.hits],
        apiPageNo: this.state.apiPageNo + 1,
      });
    });
  };

  viewHandleClick = (e, blogData) => {
    this.setState({
      blogDetails: {
        open: true,
        data: blogData,
      },
    });
  };

  handleClose = () => {
    this.setState({
      blogDetails: {
        open: false,
        data: null,
      },
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    const pagedData = [...this.state.blogsData];
    return (
      <Box m={4}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedData
                .splice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.rowsPerPage
                )
                .map((row, index) => (
                  <TableRow key={row.index}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.url}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => this.viewHandleClick(e, row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.blogsData.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <BlogDetailsComponent
          blogDetails={this.state.blogDetails}
          handleClose={this.handleClose}
        />
      </Box>
    );
  }
}

export default withStyles(useStyles)(BlogPostContainer);
