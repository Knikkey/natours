const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const requiredMsg = (el) => `A tour must have a(n) ${el}`;

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      //validators
      required: [true, requiredMsg('name')],
      maxlength: [40, 'Name must be 40 or less characters'],
      minlength: [10, 'Name must be 10 or more characters'],
      //custom validator via validator library
      //validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, requiredMsg('duration')],
    },
    maxGroupSize: {
      type: Number,
      required: [true, requiredMsg('max group size')],
    },
    difficulty: {
      type: String,
      required: [true, requiredMsg('difficulty')],
      //validators
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be either: easy, medium, or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      //validators
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must not be more than 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, required: [true, requiredMsg('price')] },
    priceDiscount: {
      type: Number,
      //custom validation
      validate: {
        validator: function (val) {
          //this points to current doc when creating new document
          return val < this.price;
        },
        message: 'discount cannot be greater than price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, requiredMsg('summary')],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, requiredMsg('cover image')],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual properties
//properties that won't be saved to the database
tourSchema.virtual('durationWeeks').get(function () {
  return (this.duration / 7).toFixed(1);
});

//pre-middleware (document)
//runs before the specified step (save or create)
//this -> document
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//post middleware (document)
//runs after the specified step (save or create)
//this -> document
tourSchema.post('save', function (doc, next) {
  // console.log(doc);
  next();
});

//query middleware
//middleware that runs a query; this points to a query, not a document
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took: ${Date.now() - this.start} ms.`);
  next();
});

//aggregation middleware
//this -> aggregation object
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
