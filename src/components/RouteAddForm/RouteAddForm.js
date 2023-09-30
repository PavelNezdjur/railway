import { useDispatch } from "react-redux";
import { addRoute } from "../../features/route/routeSlice";
import { v4 } from "uuid";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import RouteStationAdd from "./RouteStationAdd.js/RouteStationAdd";
import RouteNumAdd from "./RouteNumAdd/RouteNumAdd";
import RouteMiddleStationsAdd from "./RouteMiddleStationsAdd/RouteMiddleStationsAdd";
import RouteTicketsAdd from "./RouteTicketsAdd/RouteTicketsAdd";
import { Box, Button, Card, Modal } from "@mui/material";
import { AddCircleOutline, ClearOutlined } from "@mui/icons-material";
import RouteAdd from "../../images/RouteAdd.jpg";

const RouteAddForm = ({ active, close }) => {
  const dispatch = useDispatch();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      middleStations: [{}],
      tickets: [{}],
    },
  });

  const { handleSubmit, control, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    name: "middleStations",
    control: control,
  });

  const {
    fields: fieldTicket,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    name: "tickets",
    control: control,
  });

  const onSubmit = (data) => {
    console.log("получены: ", data);
    console.log("fields: ", fields);
    reset();

    const newRoute = {
      id: v4(),
      numRoute: data.numRoute,
      departStation: data.departStation.value,
      departTime: data.departTime,
      arriveStation: data.arriveStation.value,
      arriveTime: data.arriveTime,

      middleStations: data.middleStations.map((station) => ({
        id: v4(),
        title: station.value,
        stopTime: station.stopTime,
        departTime: station.departMidStTime,
      })),

      tickets: data.tickets.map((ticket) => ({
        id: v4(),
        carriageType: ticket.value,
        ticketsTotal: ticket.ticketsTotal,
        ticketPrice: ticket.ticketPrice,
      })),
    };
    console.log("newRoute", newRoute);
    dispatch(addRoute(newRoute));
    close(false);
  };

  return (
    <Modal open={active}>
      <Card
        sx={{
          gridAutoFlow: "column",
          overflowY: "auto",
          maxWidth: 800,
          height: 579,
          backgroundImage: `url(${RouteAdd})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: "30%",
          left: "58%",
          transform: "translate(-70%, -30%)",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <RouteNumAdd />

            <RouteStationAdd
              sx={{ mb: 1 }}
              typeStation="departStation"
              placeholderStation="Departure Station"
              typeTime="departTime"
              placeholderTime="Departure Time"
            />

            <RouteStationAdd
              typeStation="arriveStation"
              placeholderStation="Arrival Station"
              typeTime="arriveTime"
              placeholderTime="Arrival Time"
            />

            {fields?.map((field, index) => (
              <RouteMiddleStationsAdd
                key={field.id}
                index={index}
                remove={remove}
              />
            ))}
            <Button
              sx={{ mb: 1 }}
              type="button"
              onClick={() => {
                append("middleStations");
              }}
            >
              <AddCircleOutline />
              Middle Station
            </Button>

            {fieldTicket?.map((field, index) => (
              <RouteTicketsAdd
                key={field.id}
                index={index}
                remove={removeTicket}
              />
            ))}
            <Button
              type="button"
              onClick={() => {
                appendTicket();
              }}
            >
              {" "}
              <AddCircleOutline />
              Tickets another type
            </Button>
            <br />
            <Box display="flex" justifyContent="space-evenly" sx={{ mt: 7 }}>
              <Button type="submit" color="success" variant="contained">
                Add new route
              </Button>
              <Button onClick={() => close(false)} color="error">
                <ClearOutlined /> close
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Card>
    </Modal>
  );
};

export default RouteAddForm;

//_______________________________________________LAST VERSION____________________________________________

// import { useSelector } from 'react-redux'
// import { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { addRoute } from "../../features/route/routeSlice"
// import StationForm from "../StationForm/StationForm"
// import { v4 } from "uuid"
// import ReactSelect from 'react-select'
// import { Controller, useForm } from "react-hook-form"

// const RouteAddForm = () => {

//    //const dispatch = useDispatch()
//    const stations = useSelector ( state => state.station.stations)
//    const options = stations?.map(station=>({value: station.title, label: station.title, stopTime: station.stopTime}))

//    const getStationValue = value => value ? options.find(option => option.value === value) : ''
//    console.log('123', getStationValue())

//    const [addMiddleStation, setAddMiddleStation] = useState(false)
//    const [middleStation, setMiddleStation] = useState([])

//    const {  register,
//             formState:{errors},
//             handleSubmit,
//             reset,
//             control
//          } = useForm({mode: 'onChange'})

//    const onSubmit = (data) => {
//       reset()

//           const newRoute = {
//                id: v4(),
//                numRoute: data.numRoute,
//                departStation: data.departStation.value,
//                departTime: data.departTime,
//                arriveStation: data.arriveStation.value,
//                arriveTime: data.arriveTime,
//                middleStations: [
//                   {
//                      id: v4(),
//                      title: data.middleStation.value,
//                      stopTime: data.middleStation.stopTime,
//                      departMidStTime: data.middleStation.departMidStTime
//                },
//                ]

//                // middleStations:
//                //     data.middleStation.map(station =>
//                //     ([{ id: v4(),
//                //       title: station.value,
//                //       stopTime: station.stopTime,
//                //       departMidStTime: station.departMidStTime
//                //    }])),

//       //          // tickets: [
//       //          //    {
//       //          //       id: v4(),
//       //          //       carriageType: carriageType,
//       //          //       ticketsTotal: ticketsTotal,
//       //          //       ticketPrice: ticketPrice
//       //          //    },
//       //          // ]
//     //         }
//    }

//    console.log(newRoute, newRoute.middleStations.map(i=>i.title))

//    //dispatch(addRoute(newRoute));
// }

//    return (
//
//       <form onSubmit={handleSubmit(onSubmit)}>

// {/* Route # */}
//          <input type="text"
//             {...register('numRoute',
//             {required: "Please enter Route number"})}
//             placeholder='Route №'
//             className='routeForm__inputNumRoute' />

//             {errors?.numRoute && (<div style={{color: 'red'}}>{errors.numRoute.message}</div>)}

// {/* Departure */}

//          <div className="routeForm__departStation">
//             <Controller
//                control={control}
//                name='departStation'
//                rules={ {required: 'Departure Station is required'} }
//                render={ ({ field: {onChange, value}, fieldState: {error} }) => (
//                <div>
//                   <ReactSelect
//                      placeholder='Departure Stations'
//                      options={options}
//                      value={getStationValue(value)}
//                      //onChange={ newValue => onChange(newValue).value }
//                      onChange={onChange}
//                   />

//                   {error?.departStation && (<div style={{color: 'red'}}>{error.departStation.message}</div>)}
//                </div>)}
//             />
//          </div>
//          <br />

//          <input type="text"
//             {...register('departTime')}
//             placeholder='Departure Time'
//             className='routeForm__inputDepTime' />

// {/* Arrival */}

// <div className="routeForm__arriveStation">
//             <Controller
//                control={control}
//                name='arriveStation'
//                rules={ {required: 'Arrival Station is required'} }
//                render={ ({ field: {onChange, value}, fieldState: {error} }) => (
//                <div>
//                   <ReactSelect
//                      placeholder='Arrival Stations'
//                      options={options}
//                      value={getStationValue(value)}
//                      onChange={ newValue => onChange(newValue).value }
//                   />

//                   {error?.arriveStation && (<div style={{color: 'red'}}>{error.arriveStation.message}</div>)}
//                </div>)}
//             />
//          </div>
//          <br />

//          <input type="text"
//             {...register('arriveTime')}
//             placeholder='Arrival Time'
//             className='routeForm__inputArriveTime' />

// {/* Middle Stations */}

//          <div className="routeForm__middleStations">
//             <Controller
//                control={control}
//                name='middleStation'
//                render={ ({ field: {onChange, value} }) => (
//                <div>
//                   <ReactSelect
//                      placeholder='Middle Station'
//                      //setValue={setMiddleStationTitle(value)}
//                      options={options}
//                      value={getStationValue(value)}
//                      onChange={ newValue => onChange(newValue).value }

//                   />
//                </div>)}
//             />
//          </div>
//             <input
//                type="text"
//                {...register('middleStation.departMidStTime',
//                {required: "Please enter departure time"})}
//                placeholder='DepartMidStTime'>
//             </input>
//             <Button type='Button' onClick={()=>setAddMiddleStation(true)}>Add middle station</Button>
//             {
//                addMiddleStation ?
//                   <div className="routeForm__middleStations">
//                      <Controller
//                         control={control}
//                         name='middleStation'
//                         render={ ({ field: {onChange, value} }) => (
//                         <div>
//                            <ReactSelect
//                               placeholder='Middle Station'
//                               // setValue={setMiddleStationTitle(value)}
//                               options={options}
//                               value={getStationValue(value)}
//                               // onChange={ newValue => onChange(newValue).value }
//                               onChange={newValue => setMiddleStation(onChange(newValue).value)}
//                            />
//                         </div>)}
//                      />
//                      <input
//                         type="text"
//                         {...register('middleStation.departMidStTime',
//                         {required: "Please enter departure time"})}
//                         placeholder='DepartMidStTime'>
//                      </input>
//                   </div> : ''
//             }
//             {console.log(addMiddleStation)}

//          {/* <input type="text"
//             {...register('middleDepartTime')}
//             placeholder='Departure Time'
//             className='routeForm__inputArriveTime' /> */}
//          <br />
// {/* Finish Button */}
//          <Button

//                    className='form__ButtonAddRoute'
//                    >Add new route
//                 </Button>

//       </form>

//    )
// }

// export default RouteAddForm;

// __________________________________________________________________________________________________//

// !!!!!!first version!!!!!!!

// import { useDispatch, useSelector } from 'react-redux'
// import { addRoute } from '../../features/route/routeSlice';
// import { v4 } from 'uuid';
// import { useState } from 'react';
// import StationItem from '../StationItem/StationItem';
// import StationForm from '../StationForm/StationForm';

// const RouteAddForm = () => {

//    const stations = useSelector ( state => state.station.stations)

//    const dispatch = useDispatch()
//    const [numRoute, setNumRoute] = useState('')
//    const [departStation, setDepartStation] = useState('')
//    const [departTime, setDepartTime] = useState('')
//    const [arriveStation, setArriveStation] = useState('')
//    const [arriveTime, setArriveTime] = useState('')

//const showAddNewDepStation = false
//const showAddNewDepStationHandler = showAddNewDepStation === !showAddNewDepStation
//const showAddNewArriveStation = false
//const showAddNewArriveStationHandler = showAddNewArriveStation === !showAddNewArriveStation

//    const departStationHandler = e => setDepartStation(e.target.value)
//    const arriveStationHandler = e => setArriveStation(e.target.value)

//    const addNewRouteHandler = () => {

//       const newRoute = {
//          id: v4(),
//          numRoute: numRoute,
//          departStation: departStation,
//          departTime: departTime,
//          arriveStation: arriveStation,
//          arriveTime: arriveTime,
//          // middleStations: [
//          //    {
//          //       id: v4(),
//          //       title: middleStation,
//          //       stopTime: middleStopTime,
//          //       departTime: middleDepartTime
//          //    },
//          // ],
//          // tickets: [
//          //    {
//          //       id: v4(),
//          //       carriageType: carriageType,
//          //       ticketsTotal: ticketsTotal,
//          //       ticketPrice: ticketPrice
//          //    },
//          // ]
//       }
//       dispatch(addRoute(newRoute))
//    // setStationTitle('')
//    }

//    return (
//       <div className="routeForm__wrapper">
//             <form className="formAddRoute" onSubmit={e=>e.preventDefault()}>

// {/* Route № */}
//                <input type="text"
//                   value={numRoute}
//                   placeholder='Route №'
//                   onChange={e=>setNumRoute(e.target.value)}
//                   className='routeForm__inputNumRoute' />

// {/* Departure */}

//                <select name="routeForm__departStation" required="required">
//                   <label>Choose departure station</label>
//                   {
//                      stations?.map(station=>(
//                      <option onChange={departStationHandler} value={station.departStation}><StationItem key={station.id} station={station}/></option>
//                      ))
//                   }
//                </select>
//                <br />
//                <Button onClick={showAddNewDepStationHandler}>Add new station</Button>
//                { showAddNewDepStation &&
//                   <div className="add_new_station">
//                      {<StationForm /> }
//                   </div>
//                }
//                <input type="text"
//                   value={departTime}
//                   placeholder='Departure Time'
//                   onChange={e=>setDepartTime(e.target.value)}
//                   className='routeForm__inputDepTime' />

// {/* Arrival */}
//                <select name="routeForm__arriveStation" required="required">
//                   <label>Choose arrival station</label>
//                   {
//                      stations?.map(station=>(
//                      <option onChange={arriveStationHandler} value={station.arriveStation}><StationItem key={station.id} station={station}/></option>
//                      ))
//                   }
//                </select>
//                <br />
//                <Button onClick={showAddNewArriveStationHandler}>Add new station</Button>
//                { showAddNewArriveStation &&
//                   <div className="add_new_station">
//                      {<StationForm /> }
//                   </div>
//                }
//                <input type="text"
//                   value={arriveTime}
//                   placeholder='Arrival Time'
//                   onChange={e=>setArriveTime(e.target.value)}
//                   className='routeForm__inputArriveTime' />
//                <br/>

// {/* MiddleStations */}

// {/* Finish Button */}
//                <Button
//                   type='submit'
//                   onClick={() => addNewRouteHandler()}
//                   className='form__ButtonAddRoute'
//                   >Add new route
//                </Button>

//             </form>
//          </div>
//    );
// }

// export default RouteAddForm;
