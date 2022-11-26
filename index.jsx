import React from "react";
import PropTypes from "prop-types";
import { ToolTip } from "@material-ui/core";
import MyPropTypes from "./prop-types";

function TextCenter(props) {
  const { children } = props;

  return <div style={{ textAlign: "center" }}>{children}</div>;
}

TextCenter.propTypes = {
  children: PropTypes.node,
};

function FHCenter(props) {
  const { children } = props;

  return (<div style={{
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  }}>
    { children }
  </div>);
}

FHCenter.propTypes = {
  children: PropTypes.node,
};

function Percent(props) {
  const { icons, level } = props;

  const Icon = icons[Math.round(level * icons.length / 100)];

  const color = level < 15 ? "error" : "inherit";

  return <Tooltip title={level + "%"}><Icon color={color} /></Tooltip>;
}

Percent.propTypes = {
  level: MyPropTypes.percent.isRequired,
  icons: PropTypes.arrayOf(PropTypes.elementType),
};

function stringDataType(field, title) {
  return {
    field,
    title,
    propType: PropTypes.string,
    rederColumn: rowData => <TextCenter>{rowData[field]}</TextCenter>,
  };
}

function levelDataType(field, title, Percent) {
  return {
    field,
    title,
    renderColumn: rowData => <FHCenter><Percent level={rowData[field].level} /></FHCenter>,
    propType: PropTypes.shape({
      issues: PropTypes.string,
      level: MyPropTypes.percent,
    }),
  };
}

function enumDataType(field, title, Enum, propType, accessor = "") {
  return {
    field,
    title,
    renderColumn: rowData => {
      const value = _get(rowData[field], accessor);
      return <FHCenter><Enum value={value} /></FHCenter>;
    },
    propType,
  };
}

function valuedEnumDataType(field, title, Enum, declaration, shape = {}) {
  return enumDataType(field, title, Enum, PropTypes.shape({
    ...shape,
    value: MyPropTypes.enum(declaration),
  }), "value");
}

function simpleEnumDataType(field, title, Enum, declaration) {
  return enumDataType(field, title, Enum, "", MyPropTypes.enum(declaration));
}

const DataTypes = {
  string: stringDataType,
  level: levelDataType,
  enum: enumDataType,
  valuedEnum: valuedEnumDataType,
  simpleEnum: simpleEnumDataType,
};

export default DataTypes;
