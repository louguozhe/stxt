import React, { Component } from "react";
import esriLoader from "esri-loader";
import {
  mapContainerStyle,
  mapDivStyle,mapZoom,mapCenter
} from './config';
//在线切片底图服务
export default class ArcGISMap extends Component {
  constructor(props) {
    super(props);
    this.tileMapUrl =
      "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer";
  }
  componentDidMount() {
    this.initMap();
  }
  initMap() {
    const mapURL = {
      url: "https://js.arcgis.com/4.7/"
    };
    esriLoader
      .loadModules(
        [
          "esri/Map",
          "esri/Basemap",
          "esri/layers/TileLayer",
          "esri/views/MapView",
          "esri/views/SceneView",
          "dojo/domReady!"
        ],
        mapURL
      )
      .then(([Map, Basemap, TileLayer, MapView, SceneView]) => {
        let layer = new TileLayer({
          url: this.tileMapUrl
        });
        //实例化底图对象
        let baseMap = new Basemap({
          baseLayers: [layer],
          title: "Custom Basemap",
          id: "myBasemap"
        });
        //实例化地图对象
        let map = new Map({
          basemap: baseMap
        });
        //实例化view
        //2D
        let view2D = new MapView({
          center: mapCenter,
          map: map,
          container: "mapDiv2D",
          zoom: mapZoom
        });
      });
  }
  render() {
    let style = {
      width: "100%",
      height: "700px"
    };
    return (
      <div style={mapContainerStyle}>
        <div id="mapDiv2D" style={mapContainerStyle} />
      </div>
    );
  }
}
