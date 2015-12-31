/**
 * Created by: leafchild
 * Date: 12/22/15
 * Time: 11:11
 */

'use strict';

jQuery.fn.justText = function() {

	return $(this)  .clone()
		  .children()
		  .remove()
		  .end()
		  .text()
		  .trim();

};
