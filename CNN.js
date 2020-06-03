
function finalpred() {
	let img_input = document.getElementById('input_image');
	let file_input = document.getElementById('file_input');
		file_input.addEventListener('change',(e) => {
		img_input.src = URL.createObjectURL(e.target.files[0])
	},false);
	img_input.onload = async function(){
		const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Imrans23/CNN_test/master/model(1).json');
		var img = tf.browser.fromPixels(img_input);
		let img_resize = tf.image.resizeBilinear(img, [32,55]);
		img_vec = img_resize.reshape([-1,32,55,3]);
		img_norm = img_vec.div(255)
		const output = model.predict(img_norm);
		const update = output.div(1/100);
		const values = update.dataSync();
		const array1 = Array.from(values);
	
		let myChart = document.getElementById('PredChart').getContext('2d');
		let PredChart = new Chart(myChart, {
			type:'bar',
			data:{
				labels:['Dog','Cat','Panda'],
				datasets:[{
						label: 'Animal',
				data: array1,
					backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]
				}]
				},
				options:{
					responsive: true,
					maintainAspectRatio: false,
					events: ['click'],
					plugins: {
				  	datalabels: {
						align: 'end',
						anchor: 'end',        
						backgroundColor: function(context) {
					  	return context.dataset.backgroundColor;
						},
						borderRadius: 4,
						color: 'white',
						formatter: Math.round
				  	}
				 	}
				}
	});
	console.log('processed');
	}
}
