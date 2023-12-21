const cds = require('@sap/cds')
const { Client } = require('@sap/hana-client');
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
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
          // var workbook = XLSX.read(buffer, { type: "buffer", cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', cellNF: true, rawNumbers: false });
          var workbook = XLSX.read(buffer, { type: "buffer" });
          let data = []
          const sheets = workbook.SheetNames
          for (let i = 0; i < sheets.length; i++) {
            const temp = XLSX.utils.sheet_to_json(
              // workbook.Sheets[workbook.SheetNames[i]], { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false })
              workbook.Sheets[workbook.SheetNames[i]], {
                header: 0,
                defval: ""
              })
            temp.forEach((res, index) => {
              if (index === 0) return;
              data.push(JSON.parse(JSON.stringify(res)))
            })
          }
          if (data) {
            console.log("data =", data);
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

    // await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} (Industry NVARCHAR(100) NOT NULL,Year NVARCHAR(25) NOT NULL,MONTH NVARCHAR(14) NOT NULL,Location NVARCHAR(120) NOT NULL,TYPE NVARCHAR(50) NOT NULL,SubType NVARCHAR(50) NOT NULL,KPI NVARCHAR(5000) NOT NULL,Sno INTEGER NOT NULL,url NVARCHAR(5000),Value DECIMAL(34),Unit NVARCHAR(20),IUnit NVARCHAR(8),IValue DECIMAL(34),Cost DECIMAL(34),Currency NVARCHAR(10),Quality NVARCHAR(40),COMMENT NVARCHAR(5000),FiscalType BOOLEAN,YearA NVARCHAR(9),StartDate NVARCHAR(25),EndDate NVARCHAR(25),fiscal NVARCHAR(25),isValidationRequired BOOLEAN,Owner NVARCHAR(5000),Approver NVARCHAR(5000),Division NVARCHAR(5000),Value2 DECIMAL(34),Unit2 NVARCHAR(4),Distance DECIMAL(34),Weight DECIMAL(34),Scope NVARCHAR(5000),Associates INTEGER,Date DATE,Logic NVARCHAR(15),Measure NVARCHAR(70),Standard1 NVARCHAR(5000),LogicE NVARCHAR(20),GRIStd NVARCHAR(5000),SDG NVARCHAR(500),Class NVARCHAR(50),RenNon NVARCHAR(5000),FValue DECIMAL(34),FValue1 DECIMAL(34))`)
    // await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} (StudentId NVARCHAR(5000), FIRSTNAME NVARCHAR(5000) , LASTNAME NVARCHAR(5000) , DOB NVARCHAR(5000) , ADDRESS NVARCHAR(5000))`);
    // await cds.run(`INSERT INTO ${ltt} VALUES (?, ?, ?, ?, ?)`,  data.map(item => [
    //   item.StudentId,
    //   item.FirstName,
    //   item.LastName,
    //   item.DOB,
    //   item.Address
    // ]));
    // await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} "STUDENTS_HDI_STUDENTS_DB_DEPLOYER_2"."Global_Table_Types"`)
//     const ltt = 'YourLocalTemporaryTable';
// const my_tableType = 'STUDENTS_HDI_STUDENTS_DB_DEPLOYER_2.Environment_Table_Types';

// // Define the SQL statement to create the local temporary table
// const createTableSQL = `CREATE LOCAL TEMPORARY TABLE ${ltt} LIKE ${my_tableType}`;

// // Run the SQL statement using cds.run
// await cds.run(createTableSQL);
// await cds.run(`CREATE LOCAL TEMPORARY TABLE ${ltt} (Industry NVARCHAR(100),Year NVARCHAR(25),MONTH NVARCHAR(14),Location NVARCHAR(120),TYPE NVARCHAR(50),SubType NVARCHAR(50),KPI NVARCHAR(5000),Sno INTEGER,url NVARCHAR(5000),Value DECIMAL(34),Unit NVARCHAR(20),IUnit NVARCHAR(8),IValue DECIMAL(34),Cost DECIMAL(34),Currency NVARCHAR(10),Quality NVARCHAR(40),COMMENT NVARCHAR(5000),FiscalType NVARCHAR(1),YearA NVARCHAR(9),StartDate NVARCHAR(25),EndDate NVARCHAR(25),fiscal NVARCHAR(25),isValidationRequired NVARCHAR(1),Owner NVARCHAR(5000),Approver NVARCHAR(5000),Division NVARCHAR(5000),Value2 DECIMAL(34),Unit2 NVARCHAR(4),Distance DECIMAL(34),Weight DECIMAL(34),Scope NVARCHAR(5000),Associates INTEGER,Date DATE,Logic NVARCHAR(15),Measure NVARCHAR(70),Standard1 NVARCHAR(5000),LogicE NVARCHAR(20),GRIStd NVARCHAR(5000),SDG NVARCHAR(500),Class NVARCHAR(50),RenNon NVARCHAR(5000),FValue DECIMAL(34),FValue1 DECIMAL(34))`)
//     await cds.run(`INSERT INTO ${ltt} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, data.map(item => [
//       item.Industry,
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
// await cds.run(`
//   INSERT INTO ${ltt} VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// `, data.map(item => [
//   item.Industry,
//   item.Year,
//   item.Month,
//   item.Location,
//   item.Type,
//   item.SubType,
//   item.KPI,
//   item.Sno,
//   item.url,
//   item.Value,
//   item.Unit,
//   item.IUnit,
//   item.IValue,
//   item.Cost,
//   item.Currency,
//   item.Quality,
//   item.Comment,
//   item.FiscalType,
//   item.YearA,
//   item.StartDate,
//   item.EndDate,
//   item.fiscal,
//   item.isValidationRequired,
//   item.Owner,
//   item.Approver,
//   item.Division,
//   item.Value2,
//   item.Unit2,
//   item.Distance,
//   item.Weight,
//   item.Scope,
//   item.Associates,
//   item.Date,
//   item.Logic,
//   item.Measure,
//   item.Standard1,
//   item.LogicE,
//   item.GRIStd,
//   item.SDG,
//   item.Class,
//   item.RenNon,
//   item.FValue,
//   item.FValue1
// ]));

// const sam = [];
const sam = JSON.stringify(data);
const sam1 = JSON.parse(JSON.stringify(data));


    // const query = `CALL INSERTDATAANDLOGERRORS(DATATOINSERT => ${ltt}, ERRORLOG => ?)`
    const query3 = `CALL INSERTDATAANDLOGERRORS(DATATOINSERT => '${sam}', ERRORLOG => ?)`
    // const query2 = `CALL INSERTDATAANDLOGERRORS(DATATOINSERT => ${data}, ERRORLOG => ?)`
    // const query = `CALL "STUDENTS_HDI_STUDENTS_DB_DEPLOYER_2"."INSERTDATAANDLOGERRORS"(DATATOINSERT => '[{"STUDENTID":"02","FIRSTNAME":"jack","LASTNAME":"diary","DOB":"30.11.2008","ADDRESS":"mumbai"},{"STUDENTID":"03","FIRSTNAME":"dan","LASTNAME":"martin","DOB":"30.12.2009","ADDRESS":"delhi"}]',ERRORLOG => ?)`
    data = await cds.run(query3); // Change BESTSELLER to errorlog
    // data = await cds.run(query); // Change BESTSELLER to errorlog

    console.log(data);
    // await cds.run(`DROP TABLE ${ltt}`)
    //End of new code for hdb procedure*************************

    // const insertQuery = INSERT.into(entity).entries(data); 
    // // This calls the service handler of respective entity. It can be used if any custom 
    // // validations need to be performed. or else custom handlers can be skipped. 

    // let srv = await cds.connect.to('CatalogService');
    // // const { Students } = srv.entities;
    // const insertResult = await srv.run(insertQuery);
    // // await cds.transaction.run(INSERT.into(Students).entries(data))    ;
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

}