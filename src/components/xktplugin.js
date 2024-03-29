import React, { useState, useEffect } from 'react';
// Import necessary libraries from xeokit-sdk (consult documentation for exact paths)
import { Viewer, XKTLoaderPlugin } from '@xeokit/xeokit-sdk';
import {XKTModel, parseIFCIntoXKTModel, writeXKTModelToArrayBuffer} from "../xeokit-convert.es";

function IFCViewer() {
    const [xktModel, setXktModel] = useState(null);
  
    useEffect(() => {
      const loadIFC = async () => {
        try {
          const data = await utils.loadArraybuffer("./assets/models/ifc/your-ifc-file.ifc");
          const xktModel = new XKTModel();
          await parseIFCIntoXKTModel({ data, xktModel, wasmPath: "../dist/" });
          await xktModel.finalize();
          const xktArrayBuffer = writeXKTModelToArrayBuffer(xktModel);
          setXktModel(xktArrayBuffer);
        } catch (error) {
          console.error("Error loading IFC:", error);
        }
      };
  
      loadIFC();
    }, []);
  
    // Render the model if xktModel is available
    return (
      <div>
        {xktModel ? (
          <Viewer canvasId="myCanvas">
            <XKTLoaderPlugin>
              <model id="myModel" xkt={xktModel.xkt} edges={true} />
            </XKTLoaderPlugin>
          </Viewer>
        ) : (
          <div>Loading IFC model...</div>
        )}
      </div>
    );
  }
  
  export default IFCViewer;
  










// const viewer = new Viewer({
//     canvasId: "myCanvas"
// });

// const xktLoader = new XKTLoaderPlugin(viewer);

// utils.loadArraybuffer("./assets/models/ifc/rac_advanced_sample_project.ifc", async (data) => {

//         const xktModel = new XKTModel();

//         parseIFCIntoXKTModel({data, xktModel, wasmPath: "../dist/"}).then(() => {

//             xktModel.finalize().then(() => {

//                 const xktArrayBuffer = writeXKTModelToArrayBuffer(xktModel);

//                 xktLoader.load({
//                     id: "myModel",
//                     xkt: xktArrayBuffer,
//                     edges: true
//                 });

//                 viewer.cameraFlight.flyTo(viewer.scene);
//             });
//         });
//     },
//     (errMsg) => {
//     });