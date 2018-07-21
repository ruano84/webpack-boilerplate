const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dirApp = path.join(__dirname, 'app');

class ScanHtmlWebPlugin {

    scanFiles (_path) {
        let filesFound;
        const filesInPath = fs.readdirSync(_path);

        filesFound = [];

        filesInPath.forEach(fileName => {
            if (!fs.lstatSync(path.resolve(_path, fileName)).isDirectory() && fileName.indexOf('.html') != -1) {
                filesFound.push({filename:fileName});
            }
        });
        return filesFound;
    }

    constructor(_path) {
        let files;

        this.filesPath = _path;

        this.files = this.scanFiles(this.filesPath);
    }

    apply(compiler) {
		const { options: compilerOptions } = compiler;
		const { files, filesPath } = this;
		//const { commonsChunk, stylePublicPath, outputPagemap, htmlMinify } = this.options;

		Object.keys(files).forEach(fileIndex => {
			// ensure entryMap from pages has been add to webpack entry
			// webpack-dev-server may modify compilerOptions.entry, e.g add webpack-dev-server/client to every entry

            // add an WebPlugin for every page to output an html
            console.log('pagefile!!', files[fileIndex]);
            console.log('path!!', path.join(filesPath, files[fileIndex].filename));
			new HtmlWebpackPlugin({
                filename: files[fileIndex].filename,
				template: path.join(filesPath, files[fileIndex].filename),
			}).apply(compiler);
		});

        // logic for pagemap.json
        /*
		compiler.plugin('emit', (compilation, callback) => {
			if (outputPagemap) {
				const publicPath = util.getPublicPath(compilation);
				const outJson = {};
				Object.keys(this.entryMap).forEach(name => {
					outJson[name] = url.resolve(publicPath, `${this.entryMap[name].htmlOutputFilename}.html`);
				});
				util.addFileToWebpackOutput(compilation, 'pagemap.json', JSON.stringify(outJson));
			}
			callback();
        });
        */
	}
}
module.exports = ScanHtmlWebPlugin;
