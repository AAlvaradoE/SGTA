package pucp.edu.pe.sgta.service.imp;

import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Profile;
import org.springframework.web.multipart.MultipartFile;
import pucp.edu.pe.sgta.service.inter.S3DownloadService;

@Service
@Profile("!aws") //Activo cuando el perfil es distinto a aws
public class LocalS3DownloadServiceImpl implements S3DownloadService {

    @Override
    public byte[] download(String key) {
        return new byte[0];
    }

    @Override
    public void upload(String filename, MultipartFile file) throws java.io.IOException {
        // no-op
    }

    @Override
    public String getUrlFromCloudFront(String key) throws Exception {
        return null;
    }

    @Override
    public byte[] downloadFromCloudFront(String key) throws Exception {
        return new byte[0];
    }

    @Override
    public boolean existsInS3(String key) {
        return false;
    }

    @Override
    public void guardarJsonEnS3(String key, String json) {
        // no-op
    }
}