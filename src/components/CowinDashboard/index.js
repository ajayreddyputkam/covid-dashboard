// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const responseStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    responseStatus: responseStatusList.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({responseStatus: responseStatusList.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const responseData = await fetch(vaccinationDataApiUrl)

    const getFormattedData = last7DaysData => {
      const formattedList = last7DaysData.map(eachObject => ({
        dose1: eachObject.dose_1,
        dose2: eachObject.dose_2,
        vaccineDate: eachObject.vaccine_date,
      }))
      return formattedList
    }

    if (responseData.ok) {
      const data = await responseData.json()
      const formattedData = {
        last7DaysVaccination: getFormattedData(data.last_7_days_vaccination),
        vaccinationByAge: data.vaccination_by_age.map(eachObject => ({
          age: eachObject.age,
          count: eachObject.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachObject => ({
          count: eachObject.count,
          gender: eachObject.gender,
        })),
      }
      this.setState({
        vaccinationData: formattedData,
        responseStatus: responseStatusList.success,
      })
    } else {
      this.setState({responseStatus: responseStatusList.failure})
    }
  }

  renderSuccessContent = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = vaccinationData

    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-message">Something went wrong</h1>
    </div>
  )

  renderInProgressView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderAllComponents = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case responseStatusList.success:
        return this.renderSuccessContent()

      case responseStatusList.failure:
        return this.renderFailureView()

      case responseStatusList.inProgress:
        return this.renderInProgressView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-main-container">
        <div className="main-all-container">
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <p className="cowin-logo-name">Co-WIN</p>
          </div>
          <h1 className="vaccination-main-heading">
            CoWIN Vaccination in India
          </h1>
          {this.renderAllComponents()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
