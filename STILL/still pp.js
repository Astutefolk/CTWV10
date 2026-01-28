// multy smtp tinggal duplikat objek sebanyak2nya
exports.smtp = [
	{
		host	: "smtp-relay.gmail.com",
		port	: "587",
		auth	: true, 
		user 	: "1@adalogohondamotorco.email",
		pass	: "zxcdsaqwe321"
    }
];

// multy message tinggal duplikat objek sebanyak2nya
exports.message = [
	{
		fromName	: "service@intl.paypal.com",
		fromEmail	: "support-{random_letternumberuplow_40}@{random_letternumberuplow_40}.adalogohondamotorco.email",
		subject		: "[  ✉ Aleгt : [ New Updаte # Suspicious Аctivity ]  Yоuг РауРаI Асcоuпt Наѕ Вееп Lіmіtеd # Case {random_number_3}-{random_number_4}-{random_number_5} # [TV274PP{random_number_6}] # PP — ID : {random_number_10}]",
	}
];

// multy shortlink
exports.shortlink = [
	'https://google.com',
	'https://google.com',
]

exports.send = {
	delay			: 10, // detik
	pauseAfter		: 1, // pause setelah berapa email
	pauseFor		: 10, // pause selama bearpa detik
	useAmazonSES	: false, // comming soon
	useHeader		: false, // jika true maka akan menggunakan custom header yang diset di custom_headers
	useAttach		: false, // jika true maka akan menggunakan attachment yang diset di attach
	useHttpProxy	: false, // jika true maka akan send menggunakan proxy http yang sudah di set
	text			: "ini versi text nya", // ini adalah versi text dari html letter, dia akan ditampilkan jika html nya tidak bisa ditampilkan
	letter 			: "amzjunk.html", // file wajib .html
	list 			: "your-list.txt"
};

exports.proxy = {
	http 	: "87.228.103.111:8080"
};

exports.attach = {
	file 	: "your-pdf.pdf" // file bisa berupa pdf atau apapun
};

exports.custom_headers = {
	KONTOL 	: "KONTOL" // bisa diisi sesuka hati tapi gabisa pakai random tag ya
};