'use strict'

/**
 * Uncomment @babel/polyfill if you use some features from ES5+ (for IE11 compatibility)
 * E.g. Promise, Map, Set and so on
 */
import '@babel/polyfill'
import 'bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker'

/**
 * Import utils
 */
import { log } from './utils';

/**
 * jQuery code
 */
($ => {
  $(document).ready(function () {
    log('Ready')

    const datesArray = [{
      date: '2019-06-06',
      events: [
        `<div class="event-item" data-date="2019-06-06">
          <p class="event-item__name">Julianna609</p>
          <div class="event-item__period">
            <span class="start">18:30</span>
            <span class="end">18:30</span>
          </div>
          <span class="event-item__edit eventEdit"><i class="far fa-edit"></i></span>
          <span class="event-item__delete eventDelete"><i class="far fa-trash-alt"></i></span>
        </div>`
      ]
    }]

    $('#eventDate').bootstrapMaterialDatePicker({
      time: false,
      minDate: window.moment(),
      maxDate: window.moment().add(4, 'days'),
      nowButton: true,
      clearButton: true
    })

    $('input.timepicker').bootstrapMaterialDatePicker({
      date: false,
      format: 'HH:mm',
      minDate: window.moment({ h: 9 }),
      maxDate: window.moment({ h: 18 }),
      nowButton: true,
      clearButton: true
    })

    $('#eventForm').on('submit', function (e) {
      e.preventDefault()
      const $this = $(this)
      const datas = getFormValues($this)
      const validated = $this.data('validate')
      if (validated) {
        addEvent(datas)
      }
    })

    function getFormValues (form) {
      const $data = {}
      form.find('input').each(function () {
        const $this = $(this)
        const value = $this.val()
        if (validateData(value, $this)) {
          $data[this.name] = value
        }
      })
      return $data
    }

    function validateData (value, element) {
      const parentForm = element.closest('form')
      if (value) {
        parentForm.attr('data-validate', 'true')
        element.removeClass('error')
        return true
      } else {
        parentForm.attr('data-validate', 'false')
        element.addClass('error')
        return false
      }
    }

    function addEvent (datas) {
      const eventInfo = createEventCard(datas)
      addEventToArray(eventInfo)
    }

    function createEventCard (datas) {
      const eventInfo = { date: `${datas['date']}` }
      const event = `
      <div class="event-item" data-date="${datas['date']}">
        <p class="event-item__name">${datas['name']}</p>
        <div class="event-item__period">
          <span class="start">${datas['start']}</span>
          <span class="end">${datas['end']}</span>
        </div>
        <span class="event-item__edit eventEdit"><i class="far fa-edit"></i></span>
        <span class="event-item__delete eventDelete"><i class="far fa-trash-alt"></i></span>
      </div>`
      eventInfo['element'] = event
      return eventInfo
    }

    // auxiliary funtion
    function findWithAttr (array, attr, value) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i
        }
      }
      return -1
    }

    function addEventToArray (eventInfo) {
      const eventDate = eventInfo.date
      const eventElement = eventInfo.element
      const dateIndex = findWithAttr(datesArray, 'date', eventDate)

      if (dateIndex === -1) {
        datesArray.push({ date: eventDate, events: [eventElement] })
      } else {
        datesArray[dateIndex].events.push(eventElement)
      }
      createCards(datesArray)
    }

    function createCards (datesArray) {
      log(datesArray)
      for (let i = 0; i < datesArray.length; i += 1) {
        const dateCard = `
          <div class="date-item">
            <p class="date-item__title">${datesArray[i].date}</p>
            <div>
              ${datesArray[i].events}
            </div>
          </div>`

        $('#eventsList').prepend(dateCard)
      }
    } createCards(datesArray)
  })
})(window.jQuery)
