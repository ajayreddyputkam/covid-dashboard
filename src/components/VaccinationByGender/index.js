// Write your code here
import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const colorsBackground = ['#f54394', '#5a8dee', '#2cc6c6']

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="vaccination-gender-main-container">
      <div className="vaccination-gender-in-container">
        <h1 className="vaccination-gender-heading">Vaccination by gender</h1>
        <ResponsiveContainer height={400} width="100%">
          <PieChart>
            <Pie
              data={vaccinationByGender}
              dataKey="count"
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              outerRadius={100}
              innerRadius={50}
            >
              {vaccinationByGender.map((entry, index) => (
                <Cell
                  fill={colorsBackground[index]}
                  name={vaccinationByGender[index].gender}
                  key={vaccinationByGender[index].gender}
                />
              ))}
            </Pie>
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VaccinationByGender
