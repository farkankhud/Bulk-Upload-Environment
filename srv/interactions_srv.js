const cds = require('@sap/cds')
const { Client } = require('@sap/hana-client');
const { is } = require('express/lib/request');
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
const zlib = require('zlib');
cds.env.features.fetch_csrf = true

module.exports = srv => {

  srv.on('PUT', "ExcelUpload", async (req, next) => {
    if (req.data.excel) {
      var entity = req.headers.slug;
      const stream = new PassThrough();
      var buffers = [];
      req.data.excel.pipe(stream);
      await new Promise((resolve, reject) => {
        stream.on('data', dataChunk => {
          buffers.push(dataChunk);
        });
        stream.on('end', async () => {
          var buffer = Buffer.concat(buffers);
          var workbook = XLSX.read(buffer, { type: "buffer", cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', cellNF: true, rawNumbers: false });
          // var workbook = XLSX.read(buffer, { type: "buffer" });
          let data = []
          let errorNodeArray = []
          const sheetName =   'Environment'; 
        //   workbook.SheetNames = workbook.SheetNames.filter(function(item) {
        //     return item !== 'LookUp'
        // })
        
          // const sheets = workbook.SheetNames
          const sheets = workbook.Sheets[sheetName];
          let jsonData = XLSX.utils.sheet_to_json(sheets);
          let propertyToDelete = '__EMPTY';
          jsonData = jsonData.filter(obj => !obj.hasOwnProperty(propertyToDelete)); 
          // {
          //       return __EMPTY !== 'LookUp'
          //   })
          // for (let i = 0; i < sheets.length; i++) {
            // i = i - 1;
            // const temp = XLSX.utils.sheet_to_json(
            let temp = XLSX.utils.sheet_to_json(
              // workbook.Sheets[workbook.SheetNames[0]], { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false, header: 0, defval: "", blankrows: false })
              sheets, { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false })
              // workbook.Sheets[workbook.SheetNames[i]], { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false })
              temp = temp.filter(obj => !obj.hasOwnProperty(propertyToDelete));
              temp.forEach((res, index) => {
              if (index === 0) return;
             
              const res1 = validate(res);
              
              data.push(JSON.parse(JSON.stringify(res1)))
            })
          // }
          if (data) {
            // console.log("data =", data);
            const responseCall = await CallEntity(entity, data);
            if (responseCall == -1)
              reject(req.error(400, JSON.stringify(data)));
            else {
              resolve(req.notify({
                message: 'Upload Successful',
                status: 200
              }));
            }
          }
        });
      });
    } else {
      return next();
    }
  });

  srv.before('POST', 'Students', async (req) => {
    //Custom validations can be put, if required before upload
  });
  srv.on('POST', 'Students', async (req) => {
    //return reponse to excel upload entity .
    var sam = req.data;
  });

  async function CallEntity(entity, data) {
    if (entity === 'Students') {
      //If any custom handling required for a particular entity
    }
    // entity = 'STUDENTS';
    entity = 'ENVIRONMENT_REPORT';

    // NEw code for hdb procedure inserted*****************************
    // Call the database procedure using the parsed input
    // const result = await InsertRecords(data);
    const ltt = `#ltt_${cds.utils.uuid().replace(/-/g, '')}`

    await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} LIKE TTCORPORATE`)
    // await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} (Location NVARCHAR(120), Division NVARCHAR(5000),Industry NVARCHAR(100), Year NVARCHAR(25), Month NVARCHAR(14), Type NVARCHAR(50), SubType NVARCHAR(50), KPI NVARCHAR(5000), Unit NVARCHAR(20), Value DECIMAL(34), Cost DECIMAL(34), Currency NVARCHAR(10), Quality NVARCHAR(40), Comment NVARCHAR(5000))`)
    await cds.run(`INSERT INTO ${ltt} VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data.map(item => [
      item.Location,
      item.Division,
      item.Industry,
      item.Year,
      item.Month,


      item.Type,
      item.SubType,

      item.KPI,
      item.Unit,
      item.Value,


      item.Cost,

      item.Currency,
      item.Quality,
      item.Comment
    ]));

    // await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} (Industry NVARCHAR(100), Year NVARCHAR(25), MONTH NVARCHAR(14), Location NVARCHAR(120), TYPE NVARCHAR(50), SubType NVARCHAR(50), KPI NVARCHAR(5000), Sno INTEGER, url NVARCHAR(5000), Value DECIMAL(34), Unit NVARCHAR(20), IUnit NVARCHAR(8), IValue DECIMAL(34), Cost DECIMAL(34), Currency NVARCHAR(10), Quality NVARCHAR(40), COMMENT NVARCHAR(5000), FiscalType NVARCHAR(1), YearA NVARCHAR(9), StartDate NVARCHAR(25), EndDate NVARCHAR(25), fiscal NVARCHAR(25), isValidationRequired NVARCHAR(1), Owner NVARCHAR(5000), Approver NVARCHAR(5000), Division NVARCHAR(5000), Value2 DECIMAL(34), Unit2 NVARCHAR(4), Distance DECIMAL(34), Weight DECIMAL(34), Scope NVARCHAR(5000), Associates INTEGER,Date DATE, Logic NVARCHAR(15), Measure NVARCHAR(70), Standard1 NVARCHAR(5000), LogicE NVARCHAR(20), GRIStd NVARCHAR(5000),SDG NVARCHAR(500),Class NVARCHAR(50), RenNon NVARCHAR(5000), FValue DECIMAL(34), FValue1 DECIMAL(34))`)


    // await cds.run(`INSERT INTO ${ltt} VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data.map(item => [  
    //     item.Industry,
    //       item.Year,
    //       item.Month,

    //       item.Location,
    //       item.Type,
    //       item.SubType,

    //       item.KPI,
    //       item.Sno,
    //       item.url,
    //       item.Value,

    //       item.Unit,

    //       item.IUnit,
    //       item.IValue,
    //       item.Cost,

    //       item.Currency,
    //       item.Quality,
    //       item.Comment,

    //       item.FiscalType,
    //       item.YearA,
    //       item.StartDate,

    //       item.EndDate,
    //       item.fiscal,
    //       item.isValidationRequired,

    //       item.Owner,
    //       item.Approver,
    //       item.Division,

    //       item.Value2,
    //       item.Unit2,
    //       item.Distance,

    //       item.Weight,
    //       item.Scope,
    //       item.Associates,

    //       item.Date,
    //       item.Logic,
    //       item.Measure,
    //       item.Standard1,
    //       item.LogicE,

    //       item.GRIStd,
    //       item.SDG,
    //       item.Class,

    //       item.RenNon,
    //       item.FValue,
    //       item.FValue1



    //     ]));

    const query = `CALL INSERTDATAANDLOGERRORS(DATATOINSERT => ${ltt}, ERRORLOG => ?)`

    data = await cds.run(query); // Change BESTSELLER to errorlog

    await cds.run(`DROP TABLE ${ltt}`)
      //End of new code for hdb procedure*************************
      ;
    const insertResult = [];
    let query1 = SELECT.from(entity);
    await srv.run(query1);
    return insertResult; //returns response to excel upload entity

  };

  function InsertRecords(inputEntity) {
    // Connection details
    const dbHost = '3fe612e8-749c-4b42-b7f5-67b5a996f13f.hana.trial-us10.hanacloud.ondemand.com';
    const dbPort = 443; // Default HANA port
    const dbName = 'students-hdistudents-db-deployer-ws-w2wnz';
    const dbUser = 'STUDENTS_HDI_STUDENTS_DB_DEPLOYER_2_6Q7SJOI14KJMF8IOW1S7VP13Z_RT';
    const dbPassword = 'Jc3J6AZKY95U-AKvcj1Lb4T0Jqqnz8hFZeS9Q6GJD9zfQtiB0hqxXnBL.9mnWNkLwlqPHzj5NV325ImgrupOSk6FalthN4CVBSmwoNZQ5SWI5GJS.tj9HlHto2yrb8Ah';


    var hana = require('@sap/hana-client');
    var conn = hana.createConnection();
    var conn_params = {
      serverNode: '3fe612e8-749c-4b42-b7f5-67b5a996f13f.hana.trial-us10.hanacloud.ondemand.com:443',
      uid: 'DBADMIN',
      pwd: 'Far!1234',
      sslHostNameInCertificate: "*",
      sslValidateCertificate: false,

    };
    conn.connect(conn_params, function (err) {
      if (err) throw err;
      conn.disconnect();
    });

    // var conn_params = {
    //   serverNode  : '3fe612e8-749c-4b42-b7f5-67b5a996f13f.hana.trial-us10.hanacloud.ondemand.com:443',
    //   uid         : 'DBADMIN',
    //   pwd         : 'Welcome123$'
    // };

    // Connect to the database
    // connection.connect();

    // const connection = new Client(/* connection details */);
    // connection.connect();

    // Call the database procedure with the inputEntity values
    const jsonString = JSON.stringify(inputEntity);
    // Call the stored procedure with the JSON parameter
    const sql = `
  CALL "STUDENTS_HDI_STUDENTS_DB_DEPLOYER_2"."INSERTRECORDS"(?)`;
    conn.exec(sql, [jsonString], (queryErr, results) => {
      if (queryErr) {
        console.error('Error calling stored procedure:', queryErr);
      } else {
        console.log('Stored procedure results:', results);
      }

      // Close the connection when you're done
      connection.disconnect();
    });

    // return result;
  }

  function validate(str) {
    var dat = str;
    dat.Location.replace(/^\s+|\s+$/g, '');
    // dat.Division.replace(/^\s+|\s+$/g, '');
    dat.Month.replace(/^\s+|\s+$/g, '');
    dat.Type.replace(/^\s+|\s+$/g, '');
    dat.SubType.replace(/^\s+|\s+$/g, '');
    dat.KPI.replace(/^\s+|\s+$/g, '');

    if (dat.Value == null || dat.Value == '') {
      dat.Value = 0;
    }

    if (dat.Cost == null || dat.Value == '') {
      dat.Value = 0;
    }
    return dat;
  }

}