import React, { useState, useEffect } from 'react';
import { Viewer, WebIFCLoaderPlugin, NavCubePlugin, TreeViewPlugin } from '@xeokit/xeokit-sdk';
import * as WebIFC from 'web-ifc';

const IFCViewerComponent = () => {
  const [viewer, setViewer] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const ifcAPI = new WebIFC.IfcAPI();
    ifcAPI.SetWasmPath('https://cdn.jsdelivr.net/npm/web-ifc@0.0.51/');

    ifcAPI.Init().then(() => {
      const newViewer = new Viewer({
        canvasId: 'myCanvas',
        transparent: true,
        dtxEnabled: true, // Enable data texture model representation
      });
      setViewer(newViewer);

      const ifcLoader = new WebIFCLoaderPlugin(newViewer, {
        WebIFC,
        ifcAPI,
      });

      ifcLoader.load({
        id: 'myModel',
        src: '../Duplex.ifc', // Replace with your IFC file path
        loadMetadata: true, // Default
        excludeTypes: ['IfcSpace'],
        edges: true,
        dtxEnabled: true,
      }).then((sceneModel) => {
        setModel(sceneModel);
        // Handle model loaded event (similar to HTML)
      }).catch((error) => {
        console.error('Failed to load IFC model:', error);
      });
    }).catch((error) => {
      console.error('Failed to initialize WebIFC:', error);
    });
  }, []);

  return (
    <div>
      <canvas id="myCanvas" />
      {/* Other UI elements for controls (similar to HTML) */}
      {model && (
        <div id="treeViewContainer">
          {/* Tree view implementation (populate with model data) */}
        </div>
      )}
    </div>
  );
};

export default IFCViewerComponent;
