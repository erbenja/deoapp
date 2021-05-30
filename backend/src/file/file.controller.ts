import {Controller, Get, Param, Post, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../file-upload.utils";
import {apiPrefix} from "../shared/api.constants";
import {diskStorage} from 'multer';


@Controller(apiPrefix + 'files')
export class FileController {

    @Post('upload')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin', 'creator'])
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadFile(@UploadedFile()
                   file
    ) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Get(':imgpath')
    seeUploadedFile(
        @Param('imgpath') image,
        @Res() res
    ) {
        // console.log(res);
        return res.sendFile(image, {root: './files'});
    }
}
