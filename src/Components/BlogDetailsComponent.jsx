import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import JSONPretty from "react-json-pretty";

const BlogDetailsComponent = ({ blogDetails, handleClose }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={blogDetails.open}
    >
      <DialogTitle id="simple-dialog-title">Blog Details</DialogTitle>
      {blogDetails.data && (
        <DialogContent>
          <JSONPretty
            id="json-pretty"
            data={JSON.stringify(blogDetails.data)}
          ></JSONPretty>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default BlogDetailsComponent;
