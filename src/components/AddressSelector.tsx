import { useState, useEffect } from "react";
import './AdressSelector.css'

interface Province {
  province_id: string;
  province_name: string;
}

interface District {
  district_id: string;
  district_name: string;
}

interface Ward {
  ward_id: string;
  ward_name: string;
}

function AddressSelector() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load danh sách tỉnh khi component được mount
  useEffect(() => {
    setIsLoading(true);
    fetch("https://vapi.vnappmob.com/api/v2/province/")
      .then((response) => response.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setProvinces(data.results);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
        setIsLoading(false);
      });
  }, []);

  // Load danh sách huyện khi tỉnh được chọn
  useEffect(() => {
    if (selectedProvince) {
      setIsLoading(true);
      fetch(`https://vapi.vnappmob.com/api/v2/province/district/${selectedProvince}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && Array.isArray(data.results)) {
            setDistricts(data.results);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          setIsLoading(false);
        });
    } else {
      setDistricts([]);
    }
    setSelectedDistrict("");
    setSelectedDistrictName("");
    setWards([]);
    setSelectedWard("");
    setSelectedWardName("");
  }, [selectedProvince]);

  // Load danh sách xã khi huyện được chọn
  useEffect(() => {
    if (selectedDistrict) {
      setIsLoading(true);
      fetch(`https://vapi.vnappmob.com/api/v2/province/ward/${selectedDistrict}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && Array.isArray(data.results)) {
            setWards(data.results);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
          setIsLoading(false);
        });
    } else {
      setWards([]);
    }
    setSelectedWard("");
    setSelectedWardName("");
  }, [selectedDistrict]);

  // Xử lý khi chọn tỉnh
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    
    if (provinceId) {
      const province = provinces.find(p => p.province_id === provinceId);
      setSelectedProvinceName(province ? province.province_name : "");
    } else {
      setSelectedProvinceName("");
    }
  };

  // Xử lý khi chọn huyện
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    
    if (districtId) {
      const district = districts.find(d => d.district_id === districtId);
      setSelectedDistrictName(district ? district.district_name : "");
    } else {
      setSelectedDistrictName("");
    }
  };

  // Xử lý khi chọn xã
  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wardId = e.target.value;
    setSelectedWard(wardId);
    
    if (wardId) {
      const ward = wards.find(w => w.ward_id === wardId);
      setSelectedWardName(ward ? ward.ward_name : "");
    } else {
      setSelectedWardName("");
    }
  };

  return (
    <div className="address-selector-container">
      <h1 className="address-title">Chọn địa chỉ</h1>

      <div className="address-form">
        <div className="form-group">
          <label htmlFor="province">Tỉnh/Thành phố:</label>
          <div className="select-wrapper">
            <select
              id="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              disabled={isLoading}
              className="form-control"
            >
              <option value="">-- Chọn tỉnh --</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
            <span className="select-arrow"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="district">Quận/Huyện:</label>
          <div className="select-wrapper">
            <select
              id="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince || isLoading}
              className="form-control"
            >
              <option value="">-- Chọn huyện --</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>
            <span className="select-arrow"></span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ward">Phường/Xã:</label>
          <div className="select-wrapper">
            <select
              id="ward"
              value={selectedWard}
              onChange={handleWardChange}
              disabled={!selectedDistrict || isLoading}
              className="form-control"
            >
              <option value="">-- Chọn xã --</option>
              {wards.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
            <span className="select-arrow"></span>
          </div>
        </div>
      </div>

      {isLoading && <div className="loading-indicator">Đang tải dữ liệu...</div>}

      <div className="result-section">
        <h2>Địa chỉ đã chọn:</h2>
        <div className="result-card">
          {selectedProvinceName && (
            <div className="result-item">
              <span className="result-label">Tỉnh/Thành phố:</span>
              <span className="result-value">{selectedProvinceName}</span>
            </div>
          )}
          
          {selectedDistrictName && (
            <div className="result-item">
              <span className="result-label">Quận/Huyện:</span>
              <span className="result-value">{selectedDistrictName}</span>
            </div>
          )}
          
          {selectedWardName && (
            <div className="result-item">
              <span className="result-label">Phường/Xã:</span>
              <span className="result-value">{selectedWardName}</span>
            </div>
          )}
          
          {!selectedProvinceName && !selectedDistrictName && !selectedWardName && (
            <div className="no-result">Vui lòng chọn địa chỉ</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressSelector;