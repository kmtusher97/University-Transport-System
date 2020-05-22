import {
  GET_BUSES,
  GET_BUS,
  DELETE_BUS,
  GET_AVAILABLE_BUSES,
  MARK_BUSREPORT_AS_SOLVED,
  DELETE_BUSREPORT,
  GET_BUS_REQUISITIONS,
  GET_BUS_REQUISITION,
  DELETE_BUS_REQUISITION
} from "../actions/types";

const initialState = {
  buses: [],
  availableBuses: [],
  bus: {},
  busRequsitions: [],
  busRequsition: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BUSES:
      return {
        ...state,
        buses: action.payload
      }

    case GET_BUS:
      return {
        ...state,
        bus: action.payload
      }

    case DELETE_BUS:
      return {
        ...state,
        buses: state.buses.filter(
          bus => bus.busId !== action.payload
        )
      }

    case GET_AVAILABLE_BUSES:
      return {
        ...state,
        availableBuses: action.payload
      }

    case MARK_BUSREPORT_AS_SOLVED:
      return {
        ...state,
        buses: state.buses.map(
          bus => {
            if (bus.busId === action.payload.busId) {
              bus.busReports = bus.busReports.filter(
                busReport => busReport.busReportId !== action.payload.busReportId
              );
            }
            return bus;
          }
        )
      }

    case DELETE_BUSREPORT:
      return {
        ...state,
        buses: state.buses.map(
          bus => {
            if (bus.busId === action.payload.busId) {
              bus.busReports = bus.busReports.filter(
                busReport => busReport.busReportId !== action.payload.busReportId
              );
            }
            return bus;
          }
        )
      }

    case GET_BUS_REQUISITIONS:
      return {
        ...state,
        busRequsitions: action.payload
      }

    case GET_BUS_REQUISITION:
      return {
        ...state,
        busRequsition: action.payload
      }

    case DELETE_BUS_REQUISITION:
      return {
        ...state,
        busRequsitions: state.busRequsitions.filter(
          busRequsition => busRequsition.requisitionId !== action.payload
        )
      }

    default:
      return state;
  }
}