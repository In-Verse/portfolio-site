/* All the crazy ways you can say hello */
/* Many come from the cmdchallenge */
const commands = [
	"echo \"dlrow olleh\" | rev",
	"cat <(echo \"hello world\")",
	"cat <<< \"hello world\"",
	"cat >/dev/stdout <<<\"hello world\"",
	"i='hello world'; echo $i;",
	"awk 'BEGIN { print \"hello world\" }'",
	"echo \"$(echo hello)\" \"$(echo world)\"",
	"sed 's.\\.\\...;yhHh\\hh;ywWw\\ww;2,$d' README",
	"echo ifmmp xpsme |tr bcdefghijklmnopqrstuvwxyza abcdefghijklmnopqrstuvwxyz",
	"for i in h e l l o; do echo -n $i; done; echo -n \" \"; for j in w o r l d; do echo -n $j; done",
	"( for i in h e l l o \\  w o r l d ; do echo \"$i\" |awk -F, ' {print $NR}'; done ) |tr -d \\n; echo",
	"a=(d e h l o r w X \") ; s=(2 1 3 3 4 7 6 4 5 3 0) ; for i in ${s[@]} ; do echo -n ${a[$i]}|tr X\\n ' '; done ; echo \"\""
];

/* Pick a random command */
const randomCommand = commands[Math.floor(Math.random() * commands.length)];

/* I know the preferred way to do is with async tho */
function typeText(element, text, speed = 40) {
	return new Promise((resolve) => {
		let i = 0;
		const interval = setInterval(() => {
			/* If the element is empty... fallback shouldn't happen */
			if (!element) {
				clearInterval(interval);
				resolve();
				return;
			}
			/* Looping through text and adding one character at a time */
			if (i <= text.length) {
				element.textContent = text.slice(0, i);
				i++;
				return;
			}
			clearInterval(interval);
			resolve();
		}, speed);
	});
}

if (typeof document !== 'undefined') {
	/* Looking for the specific elements */
	const cmdEl = document.querySelector('.terminal .command');
	const outEl = document.querySelector('.terminal .output');
	if (cmdEl) {
		cmdEl.textContent = '';
		typeText(cmdEl, randomCommand, 35).then(() => {
			if (outEl) {
				setTimeout(() => {
					outEl.textContent = '\nhello world';
				}, 800);
			}
		});
	}
}