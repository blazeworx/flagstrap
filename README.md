# Flagstrap

A lightwieght jQuery plugin for creating Bootstrap 3 compatible country select boxes with flags.

![Flagstrap Demo](http://blazeworx.com/flagstrap.gif)

### Demo
http://blazeworx.github.io/flagstrap

### Usage

#### Basic

```html
<form class="form-horizontal">
	<div class="form-group">
        <label>Select Country</label><br>
        <div class="flagstrap" data-input-name="country"></div>
    </div>
</form>
```

```html
<script>
    $('.flagstrap').flagStrap();
</script>
```

#### Options

##### Using Data Attributes
This example will create a Flagstrap Dropdown giving the input field the name of `country` with all countries available and `Germany` pre selected and in a `scrollable` dropdown with `max-height` of `250px`.

```html
<form>
    <div class="form-group">
        <label>Select Country</label><br>
        <div id="flagstrap2"
             data-input-name="country2"
             data-selected-country="DE"
             data-button-size="btn-md"
             data-button-type="btn-default"
             data-scrollable-height="250px"
             data-scrollable="true">
        </div>
    </div>
</form>
```

```html
<script>
    $('#flagstrap2').flagStrap();
</script>
```

##### Using Instance Options
This example will create a Flagstrap Dropdown giving the input field the name of `country` with only `Australia`, `USA` and `Canada` as available options and no pre selection.

```html
<form class="form-horizontal">
    <div class="form-group">
        <label>Select Country</label><br>
        <div id="flagstrap3"></div>
    </div>
</form>
```

```html
<script>
    $('#flagstrap3').flagStrap({
        countries: {
            "AU": "Australia",
            "GB": "United Kingdom",
            "US": "United States"
        },
        inputName: 'country',
        buttonSize: "btn-lg",
        buttonType: "btn-primary",
        labelMargin: "20px",
        scrollable: false,
        scrollableHeight: "350px",
        onSelect: function(value, element) {
            //
        },
        placeholder: {
            value: "",
            text: "Please select a country"
        }
    });
</script>
```

### Options
<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">Name</th>
        <th style="width: 100px;">Type</th>
        <th style="width: 100px;">Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>inputName</td>
        <td>string</td>
        <td>uniquely generated</td>
        <td>the `name` attribute for the actual `select` input</td>
    </tr>
    <tr>
        <td>inputId</td>
        <td>string</td>
        <td>uniquely generated</td>
        <td>the `id` attribute for the actual `select` input</td>
    </tr>
    <tr>
        <td>buttonSize</td>
        <td>string</td>
        <td>"btn-md"</td>
        <td>The bootstrap button size `class` for this drop down</td>
    </tr>
    <tr>
        <td>buttonType</td>
        <td>string</td>
        <td>"btn-default"</td>
        <td>The bootstrap button type `class` for this drop down</td>
    </tr>
    <tr>
        <td>labelMargin</td>
        <td>string</td>
        <td>"20px"</td>
        <td>The `margin` between `flag` and `text label`</td>
    </tr>
    <tr>
        <td>scrollable</td>
        <td>boolean</td>
        <td>false</td>
        <td>Scrollable or full height drop down</td>
    </tr>
    <tr>
        <td>scrollableHeight</td>
        <td>string</td>
        <td>"250px"</td>
        <td>`max-height` for the scrollable drop down</td>
    </tr>
    <tr>
        <td>countries (optional)</td>
        <td>object</td>
        <td>(all)</td>
        <td>Only show specific countries<br>Example:<br><br>{"GB": "United Kingdom", "US": "United States"}<br><br>will only show the USA and UK.</td>
    </tr>
    <tr>
        <td>onSelect (optional)</td>
        <td>function</td>
        <td>null</td>
        <td>This callback gets called each time the select is changed. It receives two parameters, the new value, and the select element.</td>
     </tr>
     <tr>
        <td>placeholder</td>
        <td>bool|object</td>
        <td>{value: "", text: "Please select a country"}</td>
        <td>Set the placeholder value and text. To disable the placeholder define as (boolean) false.</td>
    </tr>
    </tbody>
</table>

### Contributors

This project was created by Alex Carter. I owe many thanks to the following people who have helped make flagstrap even better.

* [Matthew Machuga](https://github.com/machuga)
* [TJ Miller](https://github.com/sixlive)
