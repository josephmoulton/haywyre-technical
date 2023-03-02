import React from "react";
import "./Comments.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CancelIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com`,
});

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        title: "temp",
        body: "temp",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "email" },
    }));
    api.post(`/posts/${id}`, {
      id,
      title: "temp",
      body: "temp",
      isNew: true,
    });
  };

  const handleRefresh = () => {
    document.location.reload();
  };

  return (
    <GridToolbarContainer className="tools__container">
      <div>
        <Link to="/users">
          <Button
            color="primary"
            startIcon={<KeyboardDoubleArrowLeftIcon />}
          ></Button>
        </Link>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
      <div>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
        <Button
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Refresh Records
        </Button>
      </div>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

function Posts() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [userData, setUserData] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const parsedId = id.replace(":", "");

  async function fetchData() {
    const getUserPosts = api.get(`/posts`);
    const getUserData = api.get(`/users/${parsedId}`);
    axios.all([getUserPosts, getUserData]).then(
      axios.spread((...allData) => {
        const userPosts = allData[0];
        const userData = allData[1];
        const filteredPosts = userPosts.data.filter(
          (user) => user.userId == parsedId
        );
        setRows(filteredPosts);
        setUserData(userData.data);
        setLoading(false);
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    api.delete(`/posts/${id}`);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    api.patch(`/posts/${newRow.id}`, newRow);
    return updatedRow;
  };

  const columns = [
    {
      headerName: "Title",
      field: "title",
      minWidth: 200,
      flex: 0.1,
      editable: true,
    },
    {
      headerName: "Post Text",
      field: "body",
      minWidth: 350,
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <>
      <Header></Header>
      <div className="user__data--container">
        <h1 className="title">
          All of <span className="coloured">{userData.name}'s</span> posts
        </h1>
        <h3 className="subtitle">
          Here you can perform all <span className="coloured">CRUD</span>{" "}
          operations
        </h3>
      </div>
      {loading ? (
        <div className="loading__container">
          <CircularProgress className="spinner" />
        </div>
      ) : (
        <div className="table__container">
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 20, 30]}
            pagination
            components={{
              Toolbar: EditToolbar,
            }}
            componentsProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      )}
    </>
  );
}

export default Posts;
